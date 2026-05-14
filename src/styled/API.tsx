import axios from "axios";
import { DataItem } from "../Index";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getData = async (information: DataItem) => {
  const res = await api.get("/api/expenses", {
    params: {
      start: information.startDate,
      end: information.endDate,
    },
  });
  return res.data;
};

export const postData = async (data: DataItem) => {
  const day =
    typeof data.date === "string" ? data.date : data.date.format("YYYY-MM-DD");
  const res = await api.post("/api/AddData", {
    date: day,
    category: data.category,
    amount: data.amount,
    description: data.description,
    type: data.type,
  });
  return res.data;
};

export const deleteData = async (id: string) => {
  const res = await api.delete(`/api/deleteData/${id}`);
  return res;
};

export const updateData = async (key: string, value: string, id: string) => {
  const res = await api.put(`/api/update/${id}`, {
    key: key,
    value: value,
  });
  return res;
};

export const register = async (account: string, password: string) => {
  const res = await api.post(`/api/register`, {
    account: account,
    password: password,
  });
  return res;
};
