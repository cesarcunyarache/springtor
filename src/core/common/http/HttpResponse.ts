import { HttpStatusCode } from "./HttpStatusCode"


export interface ListResponse<T> {
    status: number
    message: string
    pageCount: number
    total: number
    data: T[]
}



export interface HttpResponse <T > {
    status: HttpStatusCode;
    data: T;
    message: string;
}