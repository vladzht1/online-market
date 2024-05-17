import { http } from "../app/axios";
import { User } from "../models/user";

const BASE_URL = "/api/users";

export const getAllUsers = async () => {
  return await http.get(BASE_URL);
}

export const getUserById = async (userId: number) => {
  return await http.get(`${BASE_URL}/${userId}`);
}

export const createNewUser = async (user: User) => {
  return await http.post(BASE_URL, user);
}

export const updateUser = async (user: Partial<User> & { id: number }) => {
  return await http.patch(BASE_URL, user);
}

export const deleteUserById = async (userId: number) => {
  return await http.delete(`${BASE_URL}/${userId}`);
}
