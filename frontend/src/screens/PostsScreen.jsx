import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetPostsQuery } from "../slices/postsApiSlice";

function PostsScreen() {
  const [posts, setPosts] = useState(null);
  const { data, isLoading, isError } = useGetPostsQuery();

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
          <div key={post._id}>
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
