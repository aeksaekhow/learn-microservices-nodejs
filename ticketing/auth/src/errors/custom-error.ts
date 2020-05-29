export abstract class CustomError extends Error {

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype)
    }

    abstract get statusCode(): number
    abstract get errors(): ErrorInfo[]

}

export interface ErrorInfo {
    message: string
    field?: string
}