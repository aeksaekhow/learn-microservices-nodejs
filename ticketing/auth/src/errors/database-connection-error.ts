import { CustomError, ErrorInfo } from "./custom-error";

export class DatabaseConnectionError extends CustomError {

    constructor() {
        super('Error connecting to database');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype) 
    }

    get statusCode(): number {
        return 500
    }
    get errors(): ErrorInfo[] {
        return [{message: 'Error connecting to database'}]
    }

}