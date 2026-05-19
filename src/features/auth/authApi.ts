import axiosInstance from "@/api/axios";

import type { ApiResponse } from "@/types/api";

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "@/types/auth";

export const loginApi = async (
  payload: LoginRequest
) => {
  const response =
    await axiosInstance.post<
      ApiResponse<LoginResponse>
    >("/auth/login", payload);

  return response.data;
};

export const registerApi = async (
  payload: RegisterRequest
) => {
  const response =
    await axiosInstance.post<
      ApiResponse<null>
    >("/auth/register", payload);

  return response.data;
};