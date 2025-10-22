export interface IUser {
    _id: string;
    name: string;
    username: string;
    email: string;
    password: string;
};

export type ISignUp = Omit<IUser, "id">;
export type ILogIn = Pick<IUser, "email" | "password">;