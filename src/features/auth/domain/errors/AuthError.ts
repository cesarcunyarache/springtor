

export class AuthError extends Error {
    
    constructor(message: string) {
      super(message);
      this.name = this.constructor.name;
      
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, AuthError);
      }
    }
  }
  

  export class ValidationError extends AuthError {
    constructor(message: string) {
      super(message); 
    }
  }
  

  export class AuthenticationError extends AuthError {
    constructor(message: string) {
      super(message); 
    }
  }

  export class MailError extends AuthError {
    constructor(message: string) {
      super(message); 
    }
  }
  

  export class NotFoundError extends AuthError {
    constructor(message: string) {
      super(message); 
    }
  }
  
 
  export class InternalServerError extends AuthError {
    constructor(message: string) {
      super(message);
    }
  }
  