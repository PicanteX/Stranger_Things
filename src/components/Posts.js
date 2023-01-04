import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DeletePost, WriteMessage } from "./index.js";

const Post = ({ setToken, posts, setPosts }) => {
  const [writeMessage, setWriteMessage] = useState({
    idx: undefined,
    button: true,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  function postMatches(post, text) {
    if (
      post.title.toLowerCase().includes(text.toLowerCase()) ||
      post.description.toLowerCase().includes(text.toLowerCase()) ||
      post.author.username.includes(text)
    ) {
      return true;
    } else {
      return false;
    }
  }

  const postsToDisplay = filteredPosts.length ? filteredPosts : posts;

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const filteredPosts = posts.filter((post) =>
            postMatches(post, searchTerm)
          );
          setFilteredPosts(filteredPosts);
          setSearchTerm("");
        }}
      >
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        ></input>
        <button type="submit">Search</button>
      </form>
      <h1 classsName="postHead">Posts</h1>
      {localStorage.getItem("token") ? (
        <Link to="CreatePost">
          <button type="button">Create Post</button>
        </Link>
      ) : null}
      <div className="cardField">
        {postsToDisplay?.map((post, i) => {
          console.log("Post: ", post);
          return (
            <div className="postCard" key={i}>
              <div className="title">{post.title}</div>
              <div className="author">
                Owner: 
                <div id="author">{post.author.username}</div>
              </div>
              <div className="description">
                Description: 
                <div id="description">{post.description}</div>
              </div>
              <div className="location">
                Location: 
                <div id="location">{post.location}</div>
              </div>
              <div className="priceAndWD">
                <div className="price">
                  Price:
                <div id="price">{post.price}</div>
                </div>
                <div className="willDeliver">
                  {post.willDeliver ? "Will Deliver" : "Will Not Deliver"}
                </div>
              </div>
              {localStorage.getItem("username") === post.author.username ? (
                /*<EditPost setToken={setToken} post={post} postId={post._id} />*/
                <DeletePost
                  setToken={setToken}
                  post={post}
                  postId={post._id}
                  posts={posts}
                  setPosts={setPosts}
                />
              ) : (
                <WriteMessage
                  postId={post._id}
                  writeMessage={writeMessage}
                  setWriteMessage={setWriteMessage}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Post;