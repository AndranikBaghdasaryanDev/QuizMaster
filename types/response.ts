export interface IResponse<T> {
    error: boolean | null;
    message: string;
    payload?: T;
}