import axiosInstance from "@/api/axios"

import type { ApiResponse } from "@/types/api"

import type {
  AttemptDetails,
  AttemptSummary,
  SubmitAttemptRequest,
} from "@/types/attempt"

export const submitAttemptApi = async (payload: SubmitAttemptRequest) => {
  const response = await axiosInstance.post<ApiResponse<null>>(
    "/attempts",
    payload
  )

  return response.data
}

export const getMyAttemptsApi = async () => {
  const response =
    await axiosInstance.get<ApiResponse<AttemptSummary[]>>("/attempts")

  return response.data
}

export const getAttemptByUuidApi = async (attemptUuid: string) => {
  const response = await axiosInstance.get<ApiResponse<AttemptDetails>>(
    `/attempts/${attemptUuid}`
  )

  return response.data
}
