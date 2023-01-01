import React, { useEffect, useState } from "react";
import { DeletePost } from "./index.js";

const Profile = ({ posts }) => {
  const [myPosts, setMyPosts] = useState([]);
  const storedName = localStorage.getItem("username");

  const makeMyPosts = async () => {
    try {
      const filteredResult = posts.filter(
        (post) => post.author.username === `${storedName}`
      );
      setMyPosts(filteredResult);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    makeMyPosts();
  }, []);

  function userTernary() {
    if (storedName) {
      return (
        <>
          <h1 className="welcomeText">Welcome {storedName}</h1>
          <h2>{"My Posts:"}</h2>
          <div className="cardField">
            {myPosts.map((myPost) => {
              return (
                <>
                  <div className="postCard" key={`${myPost._id} Profile`}>
                    <div className="title">{myPost.title}</div>
                    <div className="author">
                      Owner:
                      <div id="author">{myPost.author.username}</div>
                    </div>
                    <div className="description">
                      Description:
                      <div id="description">{myPost.description}</div>
                    </div>
                    <div className="location">
                      Location:
                      <div id="location">{myPost.location}</div>
                    </div>
                    <div className="priceAndWD">
                      <div className="price">Price:</div>
                      <div id="price">{myPost.price}</div>
                    </div>
                    <div className="willDeliver">
                      {myPost.willDeliver ? "Will Deliver" : "Will Not Deliver"}
                    </div>
                    <div className="messageField">
                      Messages:
                      {myPost.messages.map((message) => {
                        return (
                          <>
                            <div className="author">
                              Requester:
                              {message.fromUser.username}
                            </div>
                            <div className="description">
                              Content:
                              <div id="description">{message.content}</div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <DeletePost
                      post={myPost}
                      postId={myPost._id}
                      posts={myPosts}
                      setPosts={setMyPosts}
                    />
                  </div>
                </>
              );
            })}
          </div>
        </>
      );
    } else {
      return <h1>Please Login</h1>;
    }
  }

  return userTernary();
};

export default Profile;