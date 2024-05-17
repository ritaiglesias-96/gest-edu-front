'use server';
const apiRoute = process.env.BACK_API;

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export const loginFetch = async (data: { email: string; password: string }) => {
  const response = await fetch(`https://localhost:8080/gest-edu/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => {
    return res.json();
  });
  return response;
};

export const logoutFetch = async (token: string) => {
  const response = await fetch(`https://localhost:8080/gest-edu/api/logout`, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
  }).then((res) => {
    return res.status;
  });
  console.log(response);
  return response;
};
// Session
