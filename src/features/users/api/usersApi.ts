import { apiClient } from '@shared/api/axiosInstance';

export interface User {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
}

export interface CreateUserData {
  name: string;
  avatar: string;
}

export interface UpdateUserData {
  name: string;
  avatar: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>('/users');
  return response.data;
};

export const createUser = async (data: CreateUserData): Promise<User> => {
  const response = await apiClient.post<User>('/users', data);
  return response.data;
};

export const updateUser = async (id: string, data: UpdateUserData): Promise<User> => {
  const response = await apiClient.put<User>(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await apiClient.delete(`/users/${id}`);
};
