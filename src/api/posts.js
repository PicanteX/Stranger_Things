export const BASE_URL = "https://strangers-things.herokuapp.com";
export const key = "/2209-ftb-et-web-pt";

export const fetchPosts = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api${key}/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const { data } = await response.json();
  console.log(data.posts, "data posts");
  return data.posts;
};

export const newPost = async (
  token,
  title,
  description,
  price,
  location,
  willDeliver
) => {
  const result = await fetch(`${BASE_URL}/api${key}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      post: {
        title,
        description,
        price,
        location,
        willDeliver,
      },
    }),
  });
  const data = await result.json();
  console.log(data, "data");

  return data;
};
export const removePost = async (postId, token) => {
  console.log("PostId: ", postId);
  console.log(`${BASE_URL}/api${key}/posts/${postId}`);
  const result = await fetch(`${BASE_URL}/api${key}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await result.json();
  console.log("removePost: ", data);
  return data;
};

export const sendMessage = async (postId, token, content) => {
  const result = await fetch(
    `${BASE_URL}/api${key}/posts/${postId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: {
          content,
        },
      }),
    }
  );
  const data = await result.json();
  console.log(data, "data");

  return data;
};