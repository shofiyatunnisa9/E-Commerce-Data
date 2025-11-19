import { api } from "./api";

export async function loginService(
  email: string,
  password: string,
  name: string
) {
  const res = await api.get(
    `/users?email=${email}&password=${password}&name=${name}`
  );
  return res.data[0];
}
