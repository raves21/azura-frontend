import { z } from "zod";

export const codeVerificationFormSchema = z.object({
  code: z.string().min(6, {
    message: "Code must be 6 digits.",
  }),
});

export const passwordConfirmationFormSchema = z
  .object({
    password: z
      .string()
      .min(1, {
        message: "This field is required.",
      })
      .superRefine((password, ctx) => {
        if (password.length < 8) {
          ctx.addIssue({
            code: "custom",
            message: "Minimum of 8 characters.",
          });
        }
      }),
    confirmPassword: z.string().min(1, {
      message: "This field is required.",
    }),
  })
  .refine((values) => values.confirmPassword === values.password, {
    message: "Passwords doesn't match.",
    path: ["confirmPassword"],
  });

export const userDetailsFormSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "This field is required.",
    })
    .max(30, {
      message: "Maximum of 30 characters.",
    }),
  handle: z
    .string()
    .min(1, {
      message: "This field is required.",
    })
    .regex(/^[A-Za-z0-9._]+$/, {
      message: "Letters, digits, period, or underscores only.",
    })
    .max(15, {
      message: "Maximum of 15 characters.",
    }),
  email: z.string().email({
    message: "Email is badly formatted.",
  }),
});

export const loginFormSchema = z.object({
  email: z.string().email({
    message: "Email is badly formatted.",
  }),
  password: z.string().min(1, {
    message: "This field is required.",
  }),
});

export const findAccountFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "This field is required.",
    })
    .email({
      message: "Email is badly formatted.",
    }),
});

export const changePasswordFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, {
        message: "This field is required.",
      })
      .superRefine((password, ctx) => {
        if (password.length < 8) {
          ctx.addIssue({
            code: "custom",
            message: "Minimum of 8 characters.",
          });
        }
      }),
    confirmNewPassword: z.string().min(1, {
      message: "This field is required.",
    }),
  })
  .refine((values) => values.confirmNewPassword === values.newPassword, {
    message: "Passwords doesn't match.",
    path: ["confirmNewPassword"],
  });
