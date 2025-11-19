import { api } from "./api";

export const getTransactions = () => api.get("/transactions");
export const createTransaction = (data: any) => api.post("/transactions", data);
export const updateTransaction = (id: string, data: any) =>
  api.put(`/transactions/${id}`, data);
export const deleteTransaction = (id: string) =>
  api.delete(`/transactions/${id}`);
