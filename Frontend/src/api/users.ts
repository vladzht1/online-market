import { http } from "../app/axios";
import { User } from "../models/user";

export const getAllUsers = async () => {
  return await http.get("/api/users");
}

export const getUserById = async (userId: number) => {
  return await http.get(`/api/users/${userId}`);
}

export const createNewUser = async (user: User) => {
  return await http.post("/api/users", user);
}

export const updateUser = async (user: Partial<User> & { id: number }) => {
  return await http.patch("/api/users", user);
}

export const deleteUserById = async (userId: number) => {
  return await http.delete(`/api/users/${userId}`);
}
