type LoginResponseUser = {
  id: string;
  username: string;
  email: string;
  handle: string;
  avatar: string;
};

type UserSession = {
  userId: string;
  sessionId: string;
  deviceName: string;
  createdAt: string;
};

export type LoginResponseDetachedMode = {
  message: string;
  isDetachedMode: true;
  data: {
    user: LoginResponseUser;
    accessToken: never;
    sessions: UserSession[];
  };
};

export type LoginResponseRegular = {
  message: string;
  isDetachedMode: false;
  data: {
    user: LoginResponseUser;
    sessions: never;
    accessToken: string;
  };
};

export type LoginResponse = {
  message: string;
} & (LoginResponseDetachedMode | LoginResponseRegular);

export enum SignUpStep {
  USER_DETAILS = "userDetails",
  PASSWORD_CONFIRMATION = "passswordConfirmation",
  VERIFY_EMAIL = "verifyEmail",
}

export type SignUpValues = {
  username: string;
  handle: string;
  email: string;
  password: string;
};

export enum ForgotPasswordStep {
  FIND_ACCOUNT = "findAccount",
  VERIFY_EMAIL = "verifyEmail",
  CHANGE_PASSWORD = "changePassword",
}
