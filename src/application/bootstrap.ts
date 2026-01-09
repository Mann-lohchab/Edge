import { Router } from "../http/router/router"
import { createServer } from "../http/server"

type ApplicationOptions = {
  rootModule?: any
}

export function createApplication(options: ApplicationOptions = {}) {
  const router = new Router()

  return {
    
    // 🔹 ROUTE DEFINITIONS
    get(path: string, handler: Function) {
      router.get(path, handler)
    },
    post(path: string, handler: Function) {
      router.post(path, handler)
    },
    put(path: string , handler:Function){
      router.put(path, handler )
    },
    delete(path: string , handler: Function ){
      router.delete(path ,handler)
    },

    // 🔹 START SERVER
    listen(port: number) {
      console.log("Listening on", port)
      createServer({ port, router })
    },
  }
}
