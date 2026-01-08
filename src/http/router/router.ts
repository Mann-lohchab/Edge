export class Router {
    private routes: {
        method: string
        path: string
        handler: Function
    }[] = []

    get(path: string, handler: Function) {
        this.routes.push({
            method: "GET",
            path,
            handler,
        })
    }

    post(path: string, handler: Function) {
        this.routes.push({
            method: "POST",
            path,
            handler,
        })
    }
    put(path: string, handler: Function) {
        this.routes.push({
            method: "PUT",
            path,
            handler,
        })
    }
    delete(path: string, handler: Function) {
        this.routes.push({
            method: "DELETE",
            path,
            handler,
        })
    }

    match(req: Request) {
        const url = new URL(req.url)

        return this.routes.find(
            r => r.method === req.method && r.path === url.pathname
        )
    }
}

