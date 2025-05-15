import { z } from "zod";

export const signInSchema = z.object({
  userName: z
    .string({ required_error: "Bạn cần nhập username" })
    .min(8, { message: "Username ít nhất 8 ký tự" })
    .regex(/^[A-Za-z][A-Za-z0-9]*$/, {
      message: "Username phải bắt đầu bằng chữ và chỉ chứa chữ và số",
    }),

  password: z
    .string({ required_error: "Bạn cần nhập password" })
    .min(8, { message: "Password phải ít nhất 8 ký tự" })
    .regex(/[A-Z]/, {
      message: "Password phải chứa ít nhất một chữ in hoa",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password phải chứa ít nhất một ký tự đặc biệt",
    }) 
});

export type SignInFormType = z.infer<typeof signInSchema>;