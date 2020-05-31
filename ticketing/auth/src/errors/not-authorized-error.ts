import { CustomError, ErrorInfo } from "./custom-error";

export class NotAuthorizedError extends CustomError {

    constructor() {
        super('Not Authorized')
        Object.setPrototypeOf(this, NotAuthorizedError.prototype)
    }

    get statusCode(): number {
        return 401
    }
    get errors(): ErrorInfo[] {
        return [{message: 'Not authorized'}]
    }

}