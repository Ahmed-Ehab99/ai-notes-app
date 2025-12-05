import { z } from "zod";

export const noteFormSchema = z.object({
  title: z.string().min(1, {
    message: "Title cannot be empty.",
  }),
  body: z.string().min(1, {
    message: "Body cannot be empty.",
  }),
});

export type NoteFormValues = z.infer<typeof noteFormSchema>;
