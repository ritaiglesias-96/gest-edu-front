'use server';
const apiRoute = process.env.BACK_API;

export const getCarreras = async () => {
  const token = sessionStorage.getItem('token');
  if (token) {
    const response = await fetch(`https://localhost:8080/gest-edu/api/login`, {
      method: 'GET',
      // headers: {
      //   Authotization: token,
      // },
    }).then((res) => {
      return res.json();
    });
    return response.body;
  }
};
