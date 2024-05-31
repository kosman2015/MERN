import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import { useGetPostsQuery } from "../slices/postsApiSlice";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>PostsScreen</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>Error: {isError.message}</div>
      ) : (
        posts &&
        posts.map((post) => (
          <div
            className="post-hover"
            key={post._id}
            onClick={() => handleClick(post._id)}
          >
            <h2>{post.title}</h2>
            <h3>By: {post.author.name}</h3>
            <p>{post.body}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default PostsScreen;
