import { CustomError, ErrorInfo } from "./custom-error";

export class BadRequestError extends CustomError {

    constructor(public message: string) {
        super(message)
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    get statusCode(): number {
        return 400
    }
    
    get errors(): ErrorInfo[] {
        return [{message: this.message}]
    }

}