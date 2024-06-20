export interface ResponseGuardian {
    success: boolean;
    message: string;
    data?:    any;
    error?:    any;
}