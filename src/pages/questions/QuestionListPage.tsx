import { useEffect, useState } from "react"

import { Link } from "react-router-dom"

import { Plus, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Badge } from "@/components/ui/badge"

import { getQuestionsApi } from "@/features/questions/questionApi"

import type { Question } from "@/types/question"

const QuestionListPage = () => {
  const [questions, setQuestions] = useState<Question[]>([])

  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    fetchQuestions()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Questions</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage latest question versions
          </p>
        </div>

        <Link to="/questions/create">
          <Button className="cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            Create Question
          </Button>
        </Link>
      </div>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead>

              <TableHead>Type</TableHead>

              <TableHead>Version</TableHead>

              <TableHead>Options</TableHead>

              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Loading questions...
                </TableCell>
              </TableRow>
            ) : questions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No questions found
                </TableCell>
              </TableRow>
            ) : (
              questions.map((question) => (
                <TableRow key={question.questionVersionUuid}>
                  <TableCell className="max-w-125 font-medium">
                    {question.questionText}
                  </TableCell>

                  <TableCell>
                    <Badge variant="secondary">{question.questionType}</Badge>
                  </TableCell>

                  <TableCell>V{question.versionNumber}</TableCell>

                  <TableCell>{question.options.length}</TableCell>

                  <TableCell className="text-right">
                    <Link to={`/questions/${question.questionUuid}/edit`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default QuestionListPage
