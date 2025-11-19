import { api } from "./api";

export const getPackages = () => api.get("/packages");
export const createPackage = (data: any) => api.post("/packages", data);
export const updatePackage = (id: string, data: any) =>
  api.put(`/packages/${id}`, data);
export const deletePackage = (id: string) => api.delete(`/packages/${id}`);
