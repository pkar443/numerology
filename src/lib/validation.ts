import { z } from "zod";
import type { UserInput } from "./numerology";

const emptyToUndefined = (value: unknown) => {
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }
  return value;
};

const normalizeMobileInput = (value: unknown) => {
  if (typeof value !== "string") {
    return value;
  }
  const digits = value.replace(/\D/g, "");
  return digits.length > 0 ? digits : undefined;
};

const dateNotInFuture = (value: string) => {
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return false;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return parsed.getTime() <= today.getTime();
};

export const userInputSchema: z.ZodType<UserInput> = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters."),
  dob: z
    .string()
    .min(1, "Date of birth is required.")
    .refine(dateNotInFuture, "Date of birth must be valid and not in the future."),
  mobile: z.preprocess(
    normalizeMobileInput,
    z
      .string()
      .regex(/^\d{7,15}$/, "Mobile must be 7-15 digits.")
      .optional(),
  ),
  email: z.preprocess(
    emptyToUndefined,
    z.string().email("Enter a valid email address.").optional(),
  ),
  houseNo: z.preprocess(emptyToUndefined, z.string().trim().optional()),
});

export const compatibilitySchema = z.object({
  personAName: z
    .string()
    .trim()
    .min(2, "Person A name must be at least 2 characters."),
  personADob: z
    .string()
    .min(1, "Person A date of birth is required.")
    .refine(dateNotInFuture, "Person A date of birth must be valid."),
  personAMobile: z.preprocess(
    normalizeMobileInput,
    z
      .string()
      .regex(/^\\d{7,15}$/, "Person A mobile must be 7-15 digits.")
      .optional(),
  ),
  personAHouse: z.preprocess(emptyToUndefined, z.string().trim().optional()),
  personBName: z
    .string()
    .trim()
    .min(2, "Person B name must be at least 2 characters."),
  personBDob: z
    .string()
    .min(1, "Person B date of birth is required.")
    .refine(dateNotInFuture, "Person B date of birth must be valid."),
  personBMobile: z.preprocess(
    normalizeMobileInput,
    z
      .string()
      .regex(/^\\d{7,15}$/, "Person B mobile must be 7-15 digits.")
      .optional(),
  ),
  personBHouse: z.preprocess(emptyToUndefined, z.string().trim().optional()),
});

export type CompatibilityFormValues = z.infer<typeof compatibilitySchema>;
