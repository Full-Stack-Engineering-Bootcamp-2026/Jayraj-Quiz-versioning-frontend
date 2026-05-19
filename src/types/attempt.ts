import type {
  QuestionOption,
  QuestionType,
} from "./question"

export type SubmitAnswer = {
  quizQuestionUuid: string
  answerText: string
}

export type SubmitAttemptRequest = {
  quizUuid: string
  answers: SubmitAnswer[]
}

export type AttemptSummary = {
  attemptUuid: string
  quizUuid: string
  quizTitle: string
  submittedAt: string
}

export type AttemptAnswer = {
  quizQuestionUuid: string
  questionUuid: string
  questionVersionUuid: string
  versionNumber: number
  questionText: string
  questionType: QuestionType
  options: QuestionOption[]
  submittedAnswer: string
}

export type AttemptDetails = {
  attemptUuid: string
  quizUuid: string
  quizTitle: string
  submittedAt: string
  answers: AttemptAnswer[]
}