export interface IResponse<T = unknown> {
    error: boolean;
    message: string;
    payload?: T;
}