import { z } from "zod";

 const userRegistrationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
   
});

const userLoginSchema = z.object({
  identifier: z
    .string()
    .min(3, "Identifier is required"),

  password: z
    .string()
    .min(1, "Password is required"),
});


 const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(1, "Old password is required"),

    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      
  })
  .refine(
    (data) => data.oldPassword !== data.newPassword,
    {
      message: "New password must be different from old password",
      path: ["newPassword"],
    }
  );




  const authValidations =  {
    userRegistrationSchema,
    userLoginSchema,
    changePasswordSchema
  }

  export default authValidations