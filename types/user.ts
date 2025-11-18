export interface IUser {
    _id: string;
    name: string;
    username: string;
    email: string;
    password?: string;
    googleId?: string | null;
    avatar?: string | null;
    authProvider?: "local" | "google";
    isVerified?: boolean;
    verifyToken?: string | null;
    verifyExpires?: Date | null;
    resetToken?: string | null;
    resetExpires?: Date | null;
    bio?: string | null;
    isPrivate?: boolean;
    subscription?: {
        plan: "free" | "pro" | "premium";
        expires?: Date | null;
    };
    createdAt?: Date;
    updatedAt?: Date;
}

export type ISignUp = Omit<IUser, "_id" | "createdAt" | "updatedAt">;
export type ILogIn = Pick<IUser, "email" | "password">;
export type IForgotPassword = Pick<IUser, "email">;

export interface IOutletContext {
    account: IUser;
    setAccount(account: IUser): void;
}