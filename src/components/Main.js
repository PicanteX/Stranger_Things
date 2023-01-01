import React from "react";
import { useEffect, useState } from "react";
import { Login, Posts, SignUp, CreatePost, Profile, Navbar } from "./index.js";
import { Routes, Route } from "react-router-dom";
import { fetchUser } from "../api/users";
import { fetchPosts } from "../api/posts";

const Main = () => {
  const [token, setToken] = useState("");
  const [postId, setPostId] = useState(null);
  const [userObj, setUserObj] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    async function getUser() {
      const data = await fetchUser(storedToken);
      setUserObj(data.data);
    }
    if (storedToken) {
      setToken(storedToken);
      getUser();
    }
  }, [token]);

  useEffect(() => {
    const getAllPosts = async () => {
      const allPosts = await fetchPosts();
      setPosts(allPosts.reverse());
    };
    getAllPosts();
    
  }, []);
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/Login">
          <Login setToken={setToken} />
        </Route>
        <Route path="/SignUp">
          <SignUp setToken={setToken} />
        </Route>
        <Route path="/CreatePost">
          <CreatePost setToken={setToken} setPosts={setPosts} posts={posts} />
        </Route>
        <Route path="/Profile">
          <Profile posts={posts} setPosts={setPosts} userObj={userObj} />
        </Route>
        <Route path="/">
          <Posts
            setToken={setToken}
            postId={postId}
            setPostId={setPostId}
            posts={posts}
            setPosts={setPosts}
          />
        </Route>
      </Routes>
    </>
  );
};

export default Main;