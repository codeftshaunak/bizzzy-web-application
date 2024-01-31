import { z } from "zod";

// schema for first step form
const MAX_FILE_SIZE = 100 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [];
export const firstStepSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(5),
  tags: z.array(z.string()).min(1),
  skills: z.array(z.string()).min(1),
  job_type: z.string().min(1),
  amount: z.coerce.number().transform((v) => Number(v)),
  file: z
    .custom()
    .refine((file) => file instanceof File, "Expected a file")
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `File size should be less than ${MAX_FILE_SIZE / 1024 / 1024}mb.`
    )
    .refine(
      (file) =>
        ACCEPTED_FILE_TYPES.length === 0 ||
        ACCEPTED_FILE_TYPES.includes(file.type),
      "File type not supported"
    )
    .optional(),
});

// schema for second step form
export const secondStepSchema = z.object({
  experience: z.enum(["Entry", "Intermediate", "Expert"]),
});

// schema for third step form
export const thirdStepSchema = z.object({
  duration: z.string(),
});
