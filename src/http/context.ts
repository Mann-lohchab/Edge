export class Context {
    public params: Record<string, string> = {}

    constructor(public req: Request) {}
    text(data:string){
    return new Response(data)
  }

  json(data: unknown) {
    return new Response(JSON.stringify(data), {
      headers: { "content-type" : "application/json"}
    })
  }
}