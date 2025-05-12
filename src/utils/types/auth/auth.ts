export type UserBasicInfo = {
  id: string;
  username: string;
  email: string;
  handle: string;
  avatar: string | null;
};

export type UserSession = {
  id: string;
  userId: string;
  browser: string | null;
  os: string | null;
  platform: string | null;
  isCurrentSession: boolean;
  expiresAt: string;
  createdAt: string;
};

export type LoginResponseDetachedMode = {
  message: string;
  isDetachedMode: true;
  data: {
    user: UserBasicInfo;
    sessions: UserSession[];
  };
};

export type LoginResponseRegular = {
  message: string;
  isDetachedMode: false;
  data: {
    user: UserBasicInfo;
    session: Pick<UserSession, "browser" | "os" | "expiresAt" | "platform">;
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
