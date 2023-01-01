import { BASE_URL, key } from "./posts";

export const fetchLoginResults = async (username, password) => {
  const response = await fetch(`${BASE_URL}/api${key}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        username,
        password,
      },
    }),
  });
  const data = await response.json();
  return data;
};

export const registerUser = async (username, password) => {
  const response = await fetch(`${BASE_URL}/api${key}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        username,
        password,
      },
    }),
  });
  const data = await response.json();
  return data;
};

export const fetchUser = async (token) => {
  const response = await fetch(`${BASE_URL}/api${key}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};