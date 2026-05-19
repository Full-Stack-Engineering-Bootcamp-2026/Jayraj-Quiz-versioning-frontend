import { useFieldArray, useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { useNavigate } from "react-router-dom"

import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { Textarea } from "@/components/ui/textarea"

import { Card, CardContent } from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  questionSchema,
  type QuestionFormData,
} from "@/features/questions/schemas/questionSchema"

import { createQuestionApi } from "@/features/questions/questionApi"

const CreateQuestionPage = () => {
  const navigate = useNavigate()

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),

    defaultValues: {
      questionText: "",
      questionType: "SINGLE_SELECT",

      options: [
        {
          optionText: "",
          displayOrder: 1,
        },

        {
          optionText: "",
          displayOrder: 2,
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  })

  const questionType = watch("questionType")

  const onSubmit = async (data: QuestionFormData) => {
    try {
      const payload = {
        ...data,

        options: data.questionType === "TEXT" ? [] : data.options,
      }

      await createQuestionApi(payload)

      navigate("/questions")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Create Question
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Create a new question version
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="space-y-2">
              <Label>Question Text</Label>

              <Textarea
                placeholder="Enter question"
                {...register("questionText")}
              />

              {errors.questionText && (
                <p className="text-sm text-red-500">
                  {errors.questionText.message}
                </p>
              )}
            </div>

           
            <div className="space-y-2">
              <Label>Question Type</Label>

              <Select
                value={questionType}
                onValueChange={(value) =>
                  setValue(
                    "questionType",
                    value as "SINGLE_SELECT" | "MULTI_SELECT" | "TEXT"
                  )
                }
              >
                <SelectTrigger className="cursor-pointer">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="SINGLE_SELECT">Single Select</SelectItem>

                  <SelectItem value="MULTI_SELECT">Multi Select</SelectItem>

                  <SelectItem value="TEXT">Text</SelectItem>
                </SelectContent>
              </Select>
            </div>

            
            {questionType !== "TEXT" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Options</Label>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() =>
                      append({
                        optionText: "",
                        displayOrder: fields.length + 1,
                      })
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Option
                  </Button>
                </div>

                <div className="space-y-3">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-3">
                      <Input
                        placeholder={`Option ${index + 1}`}
                        {...register(`options.${index}.optionText`)}
                      />

                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="cursor-pointer"
                        disabled={fields.length <= 2}
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {errors.options && (
                  <p className="text-sm text-red-500">
                    {errors.options.message as string}
                  </p>
                )}
              </div>
            )}

            
            <div className="flex justify-end">
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Question"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateQuestionPage
