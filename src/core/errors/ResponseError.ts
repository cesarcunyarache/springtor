/* class ResponseError extends Error {
    status: number;
    constructor(message: string, status: number) {
      super(message);
      this.status = status;
      this.name = "ResponseError";
    }
  
    toResponse() {
      return new Response(this.message, { status: this.status });
    }
  }
   */