export interface IResponse<T> {
    error: boolean;
    message: string;
    payload?: T;
}