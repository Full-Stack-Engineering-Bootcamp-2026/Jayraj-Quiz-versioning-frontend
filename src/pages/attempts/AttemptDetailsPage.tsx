import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"

import { Card, CardContent } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"

import { Separator } from "@/components/ui/separator"

import { getAttemptByUuidApi } from "@/features/attempts/attemptApi"

import type { AttemptDetails } from "@/types/attempt"

const AttemptDetailsPage = () => {
  const { attemptUuid } = useParams()

  const [attempt, setAttempt] = useState<AttemptDetails | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAttempt = async () => {
      try {
        if (!attemptUuid) return

        const response = await getAttemptByUuidApi(attemptUuid)

        setAttempt(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchAttempt()
  }, [attemptUuid])

  if (loading) {
    return <div>Loading attempt...</div>
  }

  if (!attempt) {
    return <div>Attempt not found</div>
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {attempt.quizTitle}
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Historical replay of submitted answers
        </p>
      </div>

      <div className="space-y-5">
        {attempt.answers.map((answer, index) => (
          <Card key={answer.quizQuestionUuid}>
            <CardContent className="space-y-5 pt-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{answer.questionType}</Badge>

                  <Badge variant="outline">V{answer.versionNumber}</Badge>
                </div>

                <div>
                  <p className="mb-1 text-sm text-muted-foreground">
                    Question {index + 1}
                  </p>

                  <h2 className="text-lg font-medium">{answer.questionText}</h2>
                </div>
              </div>

              {answer.options.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Options</p>

                  <div className="space-y-2">
                    {answer.options.map((option, optionIndex) => {
                      const submittedAnswers = answer.submittedAnswer
                        .split(",")
                        .map((item) => item.trim())

                      const isSelected = submittedAnswers.includes(
                        option.optionText
                      )

                      return (
                        <div
                          key={optionIndex}
                          className={`rounded-lg border p-3 text-sm ${
                            isSelected
                              ? "border-primary bg-primary/5"
                              : "bg-muted/30"
                          } `}
                        >
                          {option.optionText}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-medium">Submitted Answer</p>

                <div className="rounded-lg border bg-muted/30 p-4">
                  <p className="text-sm whitespace-pre-wrap">
                    {answer.submittedAnswer}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AttemptDetailsPage
