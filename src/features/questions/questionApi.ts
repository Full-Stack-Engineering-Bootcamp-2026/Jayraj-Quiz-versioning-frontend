import axiosInstance from "@/api/axios"

import type { ApiResponse } from "@/types/api"

import type {
  CreateQuestionRequest,
  Question,
} from "@/types/question"

export const getQuestionsApi = async () => {
  const response =
    await axiosInstance.get<
      ApiResponse<Question[]>
    >("/questions")

  return response.data
}

export const createQuestionApi = async (
  payload: CreateQuestionRequest
) => {
  const response =
    await axiosInstance.post<
      ApiResponse<Question>
    >("/questions", payload)

  return response.data
}

export const updateQuestionApi = async (
  questionUuid: string,
  payload: CreateQuestionRequest
) => {
  const response =
    await axiosInstance.put<
      ApiResponse<Question>
    >(
      `/questions/${questionUuid}`,
      payload
    )

  return response.data
}

export const getQuestionByUuidApi = async (
  questionUuid: string
) => {
  const response =
    await axiosInstance.get<
      ApiResponse<Question>
    >(`/questions/${questionUuid}`)

  return response.data
}