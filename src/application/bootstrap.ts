import { Router } from "../http/router/router"
import { createrServer } from "../http/server"


type ApplicationOptions = {
  rootModule?: any
}



// createApplication()
export function createApplication(options: ApplicationOptions) {

  const router = new Router()
  const server = createrServer(router)
  const resolvedOptions = {
    rootModule: options?.rootModule ?? null,
  }

  return {
    listen(port: number) {
      console.log("Listiening on ", port)
    }
  }
}