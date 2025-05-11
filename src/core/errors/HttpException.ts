
import { NextResponse } from "next/server";


export class HttpException extends Error {
    statusCode: number;
    error: string;

    constructor(message: string, statusCode: number, error: string) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.error = error;
        this.name = this.constructor.name;


    }

    send(): NextResponse {
        return NextResponse.json({
            statusCode: this.statusCode,
            error: this.error,
            message: this.message
        }, { status: this.statusCode });
    }

    static send(error: HttpException): NextResponse {
        return NextResponse.json({
            statusCode: error.statusCode,
            error: error.error,
            message: error.message
        }, { status: error.statusCode });
    }
}



export class BadRequestException extends HttpException {
    constructor(message: string) {
        super(message, 400, "BadRequest");
    }
}

export class UnauthorizedException extends HttpException {
    constructor(message: string) {
        super(message, 401, "Unauthorized");
    }
}

export class NotFoundException extends HttpException {
    constructor(message: string) {
        super(message, 404, "NotFound");
    }
}

export class ForbiddenException extends HttpException {
    constructor(message: string) {
        super(message, 403, "Forbidden");
    }
}

export class NotAcceptableException extends HttpException {
    constructor(message: string) {
        super(message, 406, "NotAcceptable");
    }
}

export class RequestTimeoutException extends HttpException {
    constructor(message: string) {
        super(message, 408, "RequestTimeout");
    }
}

export class ConflictException extends HttpException {
    constructor(message: string) {
        super(message, 409, "Conflict");
    }
}

export class GoneException extends HttpException {
    constructor(message: string) {
        super(message, 410, "Gone");
    }
}

export class HttpVersionNotSupportedException extends HttpException {
    constructor(message: string) {
        super(message, 505, "HttpVersionNotSupported");
    }
}

export class PayloadTooLargeException extends HttpException {
    constructor(message: string) {
        super(message, 413, "PayloadTooLarge");
    }
}

export class UnsupportedMediaTypeException extends HttpException {
    constructor(message: string) {
        super(message, 415, "UnsupportedMediaType");
    }
}

export class UnprocessableEntityException extends HttpException {
    constructor(message: string) {
        super(message, 422, "UnprocessableEntity");
    }
}

export class InternalServerErrorException extends HttpException {
    constructor(message: string) {
        super(message, 500, "InternalServerError");
    }
}

export class NotImplementedException extends HttpException {
    constructor(message: string) {
        super(message, 501, "NotImplemented");
    }
}

export class ImATeapotException extends HttpException {
    constructor(message: string) {
        super(message, 418, "ImATeapot");
    }
}

export class MethodNotAllowedException extends HttpException {
    constructor(message: string) {
        super(message, 405, "MethodNotAllowed");
    }
}

export class BadGatewayException extends HttpException {
    constructor(message: string) {
        super(message, 502, "BadGateway");
    }
}

export class ServiceUnavailableException extends HttpException {
    constructor(message: string) {
        super(message, 503, "ServiceUnavailable");
    }
}

export class GatewayTimeoutException extends HttpException {
    constructor(message: string) {
        super(message, 504, "GatewayTimeout");
    }
}

export class PreconditionFailedException extends HttpException {
    constructor(message: string) {
        super(message, 412, "PreconditionFailed");
    }
}
