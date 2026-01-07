export class Context {
  constructor(public req: Request) {}

  json(data: any) {
    return new Response(JSON.stringify(data))
  }
}
