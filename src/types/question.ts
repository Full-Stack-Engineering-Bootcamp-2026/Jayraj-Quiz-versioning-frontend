export type QuestionType =
  | "SINGLE_SELECT"
  | "MULTI_SELECT"
  | "TEXT"

export type QuestionOption = {
  optionText: string
  displayOrder: number
}

export type Question = {
  questionUuid: string
  questionVersionUuid: string
  versionNumber: number
  questionText: string
  questionType: QuestionType
  options: QuestionOption[]
}

export type CreateQuestionRequest = {
  questionText: string
  questionType: QuestionType
  options: QuestionOption[]
}