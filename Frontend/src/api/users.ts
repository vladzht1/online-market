import { http } from "../app/axios";

export const getAllUsers = async () => {
  return await http.get("/api/users");
}

export const deleteUserById = async (userId: number) => {
  return await http.delete(`/api/users/${userId}`);
}
