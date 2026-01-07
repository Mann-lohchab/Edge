import { Context } from "./context"
import type { Router } from "./router/router"

export function createServer({
    port,
    router,
}: {
    port: number
    router: Router
}) {
    return Bun.serve({
        port,
        fetch(req) {
            const match = router.match(req)

            if (!match) {
                return new Response("Not Found", { status: 404 })
            }

            const ctx = new Context(req)
            return match.handler(ctx)
        },
    })
}
