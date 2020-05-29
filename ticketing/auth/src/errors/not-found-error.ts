import { CustomError, ErrorInfo } from "./custom-error";

export class NotFoundError extends CustomError {

    constructor() {
        super('Not Found');
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    get statusCode(): number {
        return 404
    }
    get errors(): ErrorInfo[] {
        return [{message: 'Not Found'}]
    }

}