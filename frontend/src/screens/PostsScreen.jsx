import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetPostsQuery } from "../slices/postsApiSlice";

function PostsScreen() {
  const { data } = useGetPostsQuery();
  console.log(data);
  if (data) {
    data.forEach((element) => {
      console.log(element._id);
    });
  }
  return <div>PostsScreen</div>;
}

export default PostsScreen;
