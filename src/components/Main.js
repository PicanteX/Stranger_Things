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
        <Route path="/Login" element={<Login />} setToken={setToken}/>
        <Route path="/SignUp" element={<SignUp />} setToken={setToken}/>
        <Route path="/CreatePost" element={<CreatePost />} setToken={setToken} setPosts={setPosts} posts={posts}/>
        <Route path="/Profile" element={<Profile />} posts={posts} setPosts={setPosts} userObj={userObj}/>
      </Routes>
      <Posts posts={posts} setPosts={setPosts} setToken={setToken} postId={postId} setPostId={setPostId} />
    </>
  );
};

export default Main;