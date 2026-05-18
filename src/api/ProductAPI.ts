import axios from "axios";
import { DataItem } from "../Index";
import setupInterceptors from "./client";

const createApi = (path: string) => {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/${path}`,
    withCredentials: true,
  });

  setupInterceptors(instance);

  return instance;
};

const expensesApi = createApi("expenses");
const deleteDataApi = createApi("deleteData");
const AddDataApi = createApi("AddData");
const updateApi = createApi("update");

export const getData = async (information: DataItem) => {
  const res = await expensesApi.get("/", {
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
  const res = await AddDataApi.post("/", {
    date: day,
    category: data.category,
    amount: data.amount,
    description: data.description,
    type: data.type,
  });
  return res.data;
};

export const deleteData = async (id: string) => {
  const res = await deleteDataApi.delete(`/${id}`);
  return res;
};

export const updateData = async (key: string, value: string, id: string) => {
  const res = await updateApi.put(`/${id}`, {
    key: key,
    value: value,
  });
  return res;
};
