export class Router {
    routes: any[] = []

    register(method: string, path: string, handler: any) {
        this.routes.push({ method, path, handler })
    }

    match(req: Request) {
        const url = new URL(req.url)
        return this.routes.find(
            r => r.method === req.method && r.path === url.pathname
        )
    }
}
