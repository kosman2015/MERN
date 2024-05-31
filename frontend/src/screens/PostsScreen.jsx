import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import { useGetPostsQuery } from "../slices/postsApiSlice";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";

function PostsScreen() {
  const [posts, setPosts] = useState(null);
  const { data, isLoading, isError } = useGetPostsQuery();
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/posts/${id}`);
  };

  useEffect(() => {
    if (!isLoading && !isError) {
      setPosts(data);
    }
  }, [data, isLoading, isError]);

  return (
    <div className="center-card">
      <h1>PostsScreen</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>Error: {isError.message}</div>
      ) : (
        posts &&
        posts.map((post) => (
          <Card
            className="post-hover"
            key={post._id}
            onClick={() => handleClick(post._id)}
            bg="dark"
            border="primary"
          >
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Subtitle>By: {post.author.name}</Card.Subtitle>
              <Card.Text>{post.body}</Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

export default PostsScreen;
