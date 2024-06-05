import { useState, useEffect } from "react";
import {
  useGetPostQuery,
  useAddCommentMutation,
} from "../slices/postsApiSlice";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
function PostScreen() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetPostQuery(id);
  const { userInfo } = useSelector((state) => state.auth);
  const [addComment, { isLoading: isLoadingAddComment }] =
    useAddCommentMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    addComment({ id, comment: { comment } })
      .then((comment) => {
        e.target.reset();
      })
      .catch((err) => {
        toast.err(err?.data?.message || err.error);
      });
  };

  useEffect(() => {
    if (!isLoading && !isError && data) {
      data;
    }
  }, [data, isLoading, isError]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>404: Post does not exist</div>
      ) : (
        data && (
          <div>
            <h2>{data.post.title}</h2>
            <h3>By: {data.post.author.name}</h3>
            <p>{data.post.body}</p>
          </div>
        )
      )}
      {userInfo ? (
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="comment">
            <Form.Control
              as="textarea"
              rows={2}
              required={true}
              placeholder="Add a comment"
              onChange={(e) => e.target.value}
            ></Form.Control>
            {isLoadingAddComment && <Loader />}
            <Button type="submit" variant="primary" className="mt-3">
              Comment
            </Button>
          </Form.Group>
        </Form>
      ) : (
        <div>Please sign in to comment</div>
      )}
      {data?.comments.length > 0 ? (
        data.comments.map((comment) => (
          <div key={comment._id}>
            <p>
              <strong>{comment.author.name}</strong>
            </p>
            <p>{comment.body}</p>
          </div>
        ))
      ) : (
        <div>Be the first to comment!</div>
      )}
    </div>
  );
}

export default PostScreen;
