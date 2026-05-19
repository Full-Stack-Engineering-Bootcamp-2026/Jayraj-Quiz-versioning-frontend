import axiosInstance from "@/api/axios"

import type { ApiResponse } from "@/types/api"

import type {
  CreateQuizRequest,
  Quiz,
} from "@/types/quiz"

export const createQuizApi = async (
  payload: CreateQuizRequest
) => {
  const response =
    await axiosInstance.post<
      ApiResponse<Quiz>
    >("/quizzes", payload)

  return response.data
}

export const getQuizzesApi = async () => {
  const response =
    await axiosInstance.get<
      ApiResponse<Quiz[]>
    >("/quizzes")

  return response.data
}

export const getQuizByUuidApi = async (
  quizUuid: string
) => {
  const response =
    await axiosInstance.get<
      ApiResponse<Quiz>
    >(`/quizzes/${quizUuid}`)

  return response.data
}