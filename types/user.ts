import type { ObjectId } from "mongodb";
export interface IUser {
    _id: string | ObjectId;
    name: string;
    username: string;
    email: string;
    password: string;
    isVerified?: boolean;
    verifyToken?: string | null;
    verifyExpires?: Date | null;
};

export type ISignUp = Omit<IUser, "id">;
export type ILogIn = Pick<IUser, "email" | "password">;
export type IForgotPassword = Pick<IUser, "email">

export interface IOutletContext{
    account:IUser
    setAccount(account:IUser):void
}