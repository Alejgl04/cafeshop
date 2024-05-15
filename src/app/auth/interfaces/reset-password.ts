export interface ResetPassword {
  ok:       boolean;
  message: string;
}

export interface PasswordContent {
  password: string;
  rePassword: string;
}
