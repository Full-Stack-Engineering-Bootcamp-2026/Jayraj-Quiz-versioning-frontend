import type {
  QuestionOption,
  QuestionType,
} from "./question"

export type CreateQuizQuestion = {
  questionUuid: string
  displayOrder: number
}

export type CreateQuizRequest = {
  title: string
  questions: CreateQuizQuestion[]
}

export type QuizQuestion = {
  quizQuestionUuid: string
  questionUuid: string
  questionVersionUuid: string
  versionNumber: number
  questionText: string
  questionType: QuestionType
  options: QuestionOption[]
  displayOrder: number
}

export type Quiz = {
  quizUuid: string
  title: string
  questions: QuizQuestion[]
}