import { z } from "zod"

export const questionSchema = z
  .object({
    questionText: z
      .string()
      .min(5, "Question must be at least 5 characters"),

    questionType: z.enum([
      "SINGLE_SELECT",
      "MULTI_SELECT",
      "TEXT",
    ]),

    options: z.array(
      z.object({
        optionText: z
          .string()
          .min(1, "Option cannot be empty"),

        displayOrder: z.number(),
      })
    ),
  })

  .superRefine((data, ctx) => {
    if (
      data.questionType !== "TEXT" &&
      data.options.length < 2
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "At least 2 options are required",
        path: ["options"],
      })
    }
  })

export type QuestionFormData = z.infer<
  typeof questionSchema
>