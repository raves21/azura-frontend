import {
  changeEmailFormSchema,
  changeHandleFormSchema,
  changePasswordFormSchema,
  codeVerificationFormSchema,
  findAccountFormSchema,
  loginFormSchema,
  passwordConfirmationFormSchema,
  userDetailsFormSchema,
} from "@/utils/variables/formSchemas";
import { z } from "zod";

export type UserDetailsFormData = z.infer<typeof userDetailsFormSchema>;
export type PasswordConfirmationFormData = z.infer<
  typeof passwordConfirmationFormSchema
>;
export type LoginFormData = z.infer<typeof loginFormSchema>;
export type FindAccountFormData = z.infer<typeof findAccountFormSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordFormSchema>;
export type CodeVerificationFormData = z.infer<
  typeof codeVerificationFormSchema
>;
export type ChangeEmailFormData = z.infer<typeof changeEmailFormSchema>;
export type ChangeHandleFormData = z.infer<typeof changeHandleFormSchema>;
