import { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router-dom"

import { Card, CardContent } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Label } from "@/components/ui/label"

import { Input } from "@/components/ui/input"

import { Textarea } from "@/components/ui/textarea"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Checkbox } from "@/components/ui/checkbox"

import { getQuizByUuidApi } from "@/features/quizzes/quizApi"

import { submitAttemptApi } from "@/features/attempts/attemptApi"

import type { Quiz } from "@/types/quiz"

const AttemptQuizPage = () => {
  const navigate = useNavigate()

  const { quizUuid } = useParams()

  const [quiz, setQuiz] = useState<Quiz | null>(null)

  const [loading, setLoading] = useState(true)

  const [answers, setAnswers] = useState<Record<string, string>>({})

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        if (!quizUuid) return

        const response = await getQuizByUuidApi(quizUuid)

        setQuiz(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuiz()
  }, [quizUuid])

  const updateAnswer = (quizQuestionUuid: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [quizQuestionUuid]: value,
    }))
  }

  const handleCheckboxChange = (
    quizQuestionUuid: string,
    option: string,
    checked: boolean
  ) => {
    const current = answers[quizQuestionUuid]?.split(",") || []

    let updated: string[]

    if (checked) {
      updated = [...current, option]
    } else {
      updated = current.filter((item) => item !== option)
    }

    updateAnswer(quizQuestionUuid, updated.join(","))
  }

  const handleSubmit = async () => {
    try {
      if (!quiz) return

      await submitAttemptApi({
        quizUuid: quiz.quizUuid,

        answers: Object.entries(answers).map(
          ([quizQuestionUuid, answerText]) => ({
            quizQuestionUuid,
            answerText,
          })
        ),
      })

      navigate("/attempts")
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) {
    return <div>Loading quiz...</div>
  }

  if (!quiz) {
    return <div>Quiz not found</div>
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{quiz.title}</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          This quiz uses frozen question versions
        </p>
      </div>

      <div className="space-y-5">
        {quiz.questions.map((question, index) => (
          <Card key={question.quizQuestionUuid}>
            <CardContent className="space-y-5 pt-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-primary">
                    Question {index + 1}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    V{question.versionNumber}
                  </span>
                </div>

                <h2 className="text-lg font-medium">{question.questionText}</h2>
              </div>

              {question.questionType === "SINGLE_SELECT" && (
                <RadioGroup
                  value={answers[question.quizQuestionUuid] || ""}
                  onValueChange={(value) =>
                    updateAnswer(question.quizQuestionUuid, value)
                  }
                  className="space-y-3"
                >
                  {question.options.map((option) => (
                    <div
                      key={option.displayOrder}
                      className="flex items-center space-x-3"
                    >
                      <RadioGroupItem
                        value={option.optionText}
                        id={`${question.quizQuestionUuid}-${option.displayOrder}`}
                        className="cursor-pointer"
                      />

                      <Label className="cursor-pointer">
                        {option.optionText}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {question.questionType === "MULTI_SELECT" && (
                <div className="space-y-3">
                  {question.options.map((option) => {
                    const selected =
                      answers[question.quizQuestionUuid]
                        ?.split(",")
                        .includes(option.optionText) || false

                    return (
                      <div
                        key={option.displayOrder}
                        className="flex items-center space-x-3"
                      >
                        <Checkbox
                          checked={selected}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              question.quizQuestionUuid,
                              option.optionText,
                              !!checked
                            )
                          }
                          className="cursor-pointer"
                        />

                        <Label className="cursor-pointer">
                          {option.optionText}
                        </Label>
                      </div>
                    )
                  })}
                </div>
              )}

              {question.questionType === "TEXT" && (
                <Textarea
                  placeholder="Enter your answer"
                  value={answers[question.quizQuestionUuid] || ""}
                  onChange={(e) =>
                    updateAnswer(question.quizQuestionUuid, e.target.value)
                  }
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} className="cursor-pointer">
          Submit Quiz
        </Button>
      </div>
    </div>
  )
}

export default AttemptQuizPage
