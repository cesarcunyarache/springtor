export enum HtppStatus  {
  // Success responses
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,

  // Client error responses
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,

  // Server error responses
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

export const ResponseMessage = {
  [HtppStatus.OK]: 'Success',
  [HtppStatus.CREATED]: 'Resource created successfully',
  [HtppStatus.BAD_REQUEST]: 'Bad request',
  [HtppStatus.UNAUTHORIZED]: 'Unauthorized',
  [HtppStatus.FORBIDDEN]: 'Forbidden',
  [HtppStatus.NOT_FOUND]: 'Resource not found',
  [HtppStatus.CONFLICT]: 'Resource already exists',
  [HtppStatus.INTERNAL_SERVER_ERROR]: 'Internal server error',
} as const;