import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

import { useForm } from "react-hook-form"

import { Card, CardContent } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"

import { Checkbox } from "@/components/ui/checkbox"

import { Badge } from "@/components/ui/badge"

import { getQuestionsApi } from "@/features/questions/questionApi"

import { createQuizApi } from "@/features/quizzes/quizApi"

import type { Question } from "@/types/question"

type FormData = {
  title: string
}

const CreateQuizPage = () => {
  const navigate = useNavigate()

  const [questions, setQuestions] = useState<Question[]>([])

  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([])

  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestionsApi()

        setQuestions(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  const toggleQuestion = (questionUuid: string) => {
    setSelectedQuestions((prev) => {
      if (prev.includes(questionUuid)) {
        return prev.filter((id) => id !== questionUuid)
      }

      return [...prev, questionUuid]
    })
  }

  const onSubmit = async (data: FormData) => {
    try {
      await createQuizApi({
        title: data.title,

        questions: selectedQuestions.map((questionUuid, index) => ({
          questionUuid,
          displayOrder: index + 1,
        })),
      })

      navigate("/quizzes")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Create Quiz</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Select questions to freeze into this quiz
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label>Quiz Title</Label>

              <Input
                placeholder="Enter quiz title"
                {...register("title", {
                  required: "Quiz title is required",
                })}
              />

              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <Label>Select Questions</Label>

                <p className="mt-1 text-sm text-muted-foreground">
                  Latest question versions will be frozen into this quiz
                </p>
              </div>

              <div className="space-y-3">
                {loading ? (
                  <div>Loading questions...</div>
                ) : questions.length === 0 ? (
                  <div>No questions available</div>
                ) : (
                  questions.map((question) => {
                    const isSelected = selectedQuestions.includes(
                      question.questionUuid
                    )

                    return (
                      <div
                        key={question.questionVersionUuid}
                        className="flex items-start gap-4 rounded-xl border p-4 transition-colors hover:bg-accent/40"
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() =>
                            toggleQuestion(question.questionUuid)
                          }
                          className="mt-1 cursor-pointer"
                        />

                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                              {question.questionType}
                            </Badge>

                            <Badge variant="outline">
                              V{question.versionNumber}
                            </Badge>
                          </div>

                          <p className="font-medium">{question.questionText}</p>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={isSubmitting || selectedQuestions.length === 0}
              >
                {isSubmitting ? "Creating..." : "Create Quiz"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateQuizPage
