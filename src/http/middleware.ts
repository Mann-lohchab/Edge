import { Context } from "./context"

export type Middleware = (
    ctx: Context,
    next: () => Promise<Response>
) => Promise<Response>