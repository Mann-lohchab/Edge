import { Context } from "./context"
import type { Router } from "./router/router"
import type { Middleware } from "./middleware"
import { handleError } from "../errors/handle-error"

function compose(
    middleware: Middleware[],
    handler: (ctx:Context) => Promise<Response>
){
    return function run(ctx: Context): Promise<Response>{
        let index = -1
        async function dispatch(i: number): Promise<Response>{
            if ( i <= index ){
                throw new Error("next() called multiple times")
            }
            index = i
            const mw = middleware[i]

            if(mw){
                return mw(ctx, ()=> dispatch(i + 1))
            }
            return handler(ctx)
        }
        return dispatch(0)
    }
}

export function createServer({
    port,
    router,
    middlewares,
}: {
    port: number
    router: Router
    middlewares: Middleware[]
}) {
    return Bun.serve({
        port,
        async fetch(req) {
            try {
                const match = router.match(req)

                if (!match) {
                    return new Response("Not Found", { status: 404 })
                }

                const ctx = new Context(req)
                ctx.params = match.params
                const run = compose(middlewares , match.handler as (ctx: Context) => Promise<Response>)
                return  await run(ctx)
            } catch (err: any) {
                return handleError(err)
            }
        }
    })
}
