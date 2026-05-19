import { useEffect, useState } from "react"

import { Link } from "react-router-dom"

import { FileQuestion, PlayCircle } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Badge } from "@/components/ui/badge"

import { getQuizzesApi } from "@/features/quizzes/quizApi"

import type { Quiz } from "@/types/quiz"

const QuizListPage = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await getQuizzesApi()

        setQuizzes(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuizzes()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Available Quizzes
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Attempt quizzes with frozen question versions
        </p>
      </div>

      {loading ? (
        <div>Loading quizzes...</div>
      ) : quizzes.length === 0 ? (
        <div>No quizzes available</div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {quizzes.map((quiz) => (
            <Card
              key={quiz.quizUuid}
              className="transition-all duration-200 hover:shadow-md"
            >
              <CardContent className="space-y-5 pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Quiz</Badge>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileQuestion className="h-4 w-4" />

                      {quiz.questions.length}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">{quiz.title}</h2>

                    
                  </div>
                </div>

                <Link to={`/quizzes/${quiz.quizUuid}/attempt`}>
                  <Button className="w-full cursor-pointer">
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Attempt Quiz
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default QuizListPage
