import { HttpStatusCode } from "./HttpStatusCode";

export interface HttpResponse <T > {
    status: HttpStatusCode;
    data: T;
    message: string;
}