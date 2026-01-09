type Route = {
    method: string
    path: string
    segments: string[]
    handler: Function
}

export class Router {
    private routes: Route[] = []

    private split(path: string): string[] {
    return path.split("/").filter(Boolean)
    }

    private add(method: string , path: string , handler: Function ){
        this.routes.push({
            method,
            path,
            segments: this.split(path),
            handler,
        })
    }

get(path: string, handler: Function) {
    this.add("GET", path, handler)
}
post(path: string, handler: Function) {
    this.add("POST", path, handler)
}
put(path: string, handler: Function) {
    this.add("PUT", path, handler)
}
delete(path: string, handler: Function) {
    this.add("DELETE", path, handler)
}

    match(req: Request) {
        const url = new URL(req.url)
        const reqSegments = this.split(url.pathname)
        
    for(const route of this.routes){
        if (route.method !== req.method) continue 
        if (route.segments.length !== reqSegments.length) continue

        const params: Record<string , string> = {}
        let matched = true 

        for (let i = 0 ; i < route.segments.length; i++){
            const  routeSeg = route.segments[i]!
            const reqSeg = reqSegments[i]!

            if (routeSeg.startsWith(":")) {
                params[routeSeg.slice(1)] = reqSeg
            } else if (routeSeg !== reqSeg) {
                matched = false
                break
            }
        }

        if (matched) {
            return {
                handler: route.handler,
                params,
            }
        }
    }

    return null
    }
}


