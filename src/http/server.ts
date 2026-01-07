import { Context } from "./context"
export function createrServer(router:any){
    return Bun.serve({
        fetch(req) {
            const route = router.match(req)
            if(!route) return new Response("Not Found" , {status: 404})
             return route.handler(new Context(req))   
        }
    })
}