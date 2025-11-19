import { api } from "./api";

export const getCustomers = () => api.get("/customers");
export const createCustomer = (data: any) => api.post("/customers", data);
