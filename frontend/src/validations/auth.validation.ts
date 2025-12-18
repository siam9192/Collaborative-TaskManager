import { z } from "zod";

const userRegistrationSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(30, "Name must be at most 30 characters"),

    email: z.string().email("Invalid email address"),

    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 30 characters")
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type UserRegisterFormValues = z.infer<typeof userRegistrationSchema>;

const userLoginSchema = z.object({
  identifier: z.string().min(3, "Identifier is required"),
  password: z.string().min(1, "Password is required"),
});

export type UserLoginFormValues = z.infer<typeof userLoginSchema>;

export default {
  userRegistrationSchema,
  userLoginSchema,
};
