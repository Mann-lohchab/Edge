import { Context } from "./context"
import type { Router } from "./router/router"
import { handleError } from "../errors/handle-error"

export function createServer({
    port,
    router,
}: {
    port: number
    router: Router
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
                return match.handler(ctx)
            } catch (err: any) {
                return handleError(err)
            }
        }
    })
}
