/*
This will let user throw error in this format :
throw new HttpError(404, "User not found")
*/

export class HttpError extends Error {
    status : number 

    constructor(status: number, message: string) {
    super(message)
    this.status = status
}}

