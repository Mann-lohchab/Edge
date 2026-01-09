/* This file is just for testing purpsoes  */
import { createApplication } from "../application/bootstrap"

const App = createApplication()

App.get("/user/:id", (ctx: any) => {
  return ctx.text(ctx.params.id)
})

App.get("/health", (ctx: any) => {
  return ctx.json({ status: "ok" })
})
App.get("/error", () => {
  throw new Error("Test error")
})

App.listen(3000)
