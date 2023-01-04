import React, { useState } from "react";
import { newPost } from "../api/posts";

const CreatePost = ({ posts, setPosts }) => {
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);

  const userSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(localStorage.getItem("token"));
      const result = await newPost(
        localStorage.getItem("token"),
        title,
        description,
        price,
        location,
        willDeliver
      );
      console.log(willDeliver, "will you deliver");
      console.log(result, "result");
      if (result.success) {
        setPosts([...posts, result.data.post]);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
    setTitle("");
    setDescription("");
    setPrice("");
    setWillDeliver(false);
  };
  return (
    <div className="createPostCard">
      <form className="createCard" onSubmit={userSubmit}>
        <input
          className="title"
          type="text"
          placeholder="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        ></input>
        <input
          className="description"
          type="text"
          placeholder="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></input>
        <input
          className="price"
          type="text"
          placeholder="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <input
          className="location"
          type="text"
          placeholder="location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
        <div className="checkbox">
          <input
            type="checkbox"
            id="willDeliver"
            value={willDeliver}
            onChange={(event) => setWillDeliver(event.target.checked)}
          ></input>
          <label> Will Deliver?</label>
        </div>
        <div className="cardBtn">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;