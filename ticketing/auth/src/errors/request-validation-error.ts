import {ValidationError} from 'express-validator'
import { CustomError, ErrorInfo } from './custom-error';

export class RequestValidationError extends CustomError {

    constructor(private validationErrors: ValidationError[]) {
        super();
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    get statusCode(): number {
        return 400
    }
    get errors(): ErrorInfo[] {
        return this.validationErrors.map(validationError => ({message: validationError.msg, field:  validationError.param}))
    }

}