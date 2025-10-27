<<<<<<< HEAD
export interface IResponse<T> {
    error: boolean | null;
=======
export interface IResponse<T = unknown> {
    error: boolean;
>>>>>>> 0729139161e455777f20799a45f0845fbeb71330
    message: string;
    payload?: T;
}