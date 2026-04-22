import axios from "axios";
import type { DataItem } from "../App";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getData = async () => {
  const res = await api.get("/api/expenses");
  return res.data;
};

export const postData = async (data: DataItem) => {
  const res = await api.post("/api/AddData", {
    category: data.category,
    amount: data.amount,
    description: data.description,
    type: data.type,
  });
  return res.data;
};
