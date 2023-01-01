import React from "react";
import { removePost } from "../api/posts";

const DeletePost = ({ posts, setPosts, postId }) => {
  const storedToken = localStorage.getItem("token");
  const handleDelete = async () => {
    try {
      const result = await removePost(postId, storedToken);
      console.log("removePost result: ", result);
      if (result.success) {
        const filteredResult = posts.filter((post) => post._id !== postId);
        setPosts(filteredResult);
        // result;
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="cardBtn">
      <button type="button" className="deleteButton" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default DeletePost;