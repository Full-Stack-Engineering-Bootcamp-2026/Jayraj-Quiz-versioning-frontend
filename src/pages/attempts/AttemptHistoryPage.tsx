import { useEffect, useState } from "react"

import { Link } from "react-router-dom"

import { History, Eye } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Badge } from "@/components/ui/badge"

import { getMyAttemptsApi } from "@/features/attempts/attemptApi"

import type { AttemptSummary } from "@/types/attempt"

const AttemptHistoryPage = () => {
  const [attempts, setAttempts] = useState<AttemptSummary[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const response = await getMyAttemptsApi()

        setAttempts(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchAttempts()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Attempt History
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          View your historical quiz attempts
        </p>
      </div>

      {loading ? (
        <div>Loading attempts...</div>
      ) : attempts.length === 0 ? (
        <div>No attempts found</div>
      ) : (
        <div className="space-y-4">
          {attempts.map((attempt) => (
            <Card key={attempt.attemptUuid}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Attempt</Badge>

                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <History className="h-4 w-4" />

                        {new Date(attempt.submittedAt).toLocaleString()}
                      </div>
                    </div>

                    <h2 className="text-lg font-semibold">
                      {attempt.quizTitle}
                    </h2>
                  </div>

                  <Link to={`/attempts/${attempt.attemptUuid}`}>
                    <Button className="cursor-pointer">
                      <Eye className="mr-2 h-4 w-4" />
                      View Attempt
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default AttemptHistoryPage
