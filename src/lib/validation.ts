import { z } from "zod";
import type { UserInput } from "./numerology";

const dateNotInFuture = (value: string) => {
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return false;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return parsed.getTime() <= today.getTime();
};

const trimmedString = z.string().trim();

const optionalMobileSchema = (label: string) =>
  trimmedString
    .refine((value) => {
      if (!value) {
        return true;
      }
      const digits = value.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 15;
    }, `${label} must be 7-15 digits.`)
    .optional();

const optionalEmailSchema = trimmedString
  .refine((value) => {
    if (!value) {
      return true;
    }
    return z.string().email().safeParse(value).success;
  }, "Enter a valid email address.")
  .optional();

const optionalTextSchema = trimmedString.optional();

export const userInputSchema: z.ZodType<UserInput, UserInput> = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters."),
  dob: z
    .string()
    .min(1, "Date of birth is required.")
    .refine(dateNotInFuture, "Date of birth must be valid and not in the future."),
  mobile: optionalMobileSchema("Mobile"),
  email: optionalEmailSchema,
  houseNo: optionalTextSchema,
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
  personAMobile: optionalMobileSchema("Person A mobile"),
  personAHouse: optionalTextSchema,
  personBName: z
    .string()
    .trim()
    .min(2, "Person B name must be at least 2 characters."),
  personBDob: z
    .string()
    .min(1, "Person B date of birth is required.")
    .refine(dateNotInFuture, "Person B date of birth must be valid."),
  personBMobile: optionalMobileSchema("Person B mobile"),
  personBHouse: optionalTextSchema,
});

export type CompatibilityFormValues = z.infer<typeof compatibilitySchema>;
