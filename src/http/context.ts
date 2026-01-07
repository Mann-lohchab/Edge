export class Context {
  constructor(public req: Request) {}
  text(data:any){
    return new Response(data, {
      headers: { "content-type" : "text/plain"},
    })
  }

  json(data: any) {
    return new Response(JSON.stringify(data), {
      headers: { "content-type" : "application/json"}
    })
  }
}