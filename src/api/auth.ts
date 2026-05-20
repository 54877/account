import axios from "axios";

const createApi = (path: string) => {
  return axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/auth/${path}`,
  });
};

const registerApi = createApi("register");
const loginApi = createApi("login");

export const register = async (account: string, password: string) => {
  const res = await registerApi.post(`/`, {
    account: account,
    password: password,
  });
  return res;
};

export const login = async (account: string, password: string) => {
  const res = await loginApi.post(`/`, {
    account: account,
    password: password,
  });
  return res;
};
