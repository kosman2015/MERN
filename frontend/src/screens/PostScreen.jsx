import { useState, useEffect } from "react";
import { useGetPostQuery } from "../slices/postsApiSlice";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";

function PostScreen() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetPostQuery(id);

  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setPost(data);
    }
  }, [data, isLoading, isError]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>404: Post does not exist</div>
      ) : (
        post && (
          <div>
            <h2>{post.title}</h2>
            <h3>By: {post.author.name}</h3>
            <p>{post.body}</p>
          </div>
        )
      )}
    </div>
  );
}

export default PostScreen;
