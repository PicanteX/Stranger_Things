import React, { useState } from "react";
import { sendMessage } from "../api/posts";

const WriteMessage = ({ postId, setWriteMessage, writeMessage }) => {
  const [message, setMessage] = useState("");
  const button = writeMessage.button;
  const storedToken = localStorage.getItem("token");

  const userSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await sendMessage(postId, storedToken, message);
      if (result.success) {
      }
      setWriteMessage({ idx: null, button: !button });
    } catch (error) {
      console.error(error);
    }
    setMessage("");
  };

  const ternaryFunction = () => {
    if (!button && writeMessage.idx == postId) {
      return false;
    }
    return true;
  };
  return (
    <div className="cardBtn">
      {storedToken ? (
        ternaryFunction() ? (
          <button
            type="button"
            onClick={() => setWriteMessage({ idx: postId, button: !button })}
          >
            Message
          </button>
        ) : (
          <form id="message" onSubmit={userSubmit}>
            <input
              type="text"
              placeholder="Write your message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></input>
            <button type="submit">Submit</button>
          </form>
        )
      ) : null}
    </div>
  );
};

export default WriteMessage;