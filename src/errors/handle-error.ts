import{ HttpError }  from "./http-error";

export function handleError(err: unknown): Response {
    //list of all known http errors
    if (err instanceof HttpError) {
        return new Response(
            JSON.stringify({ error: err.message }),
            {
                status: err.status,
                headers: { "content-type": "application/json" },
            }
        )
    }
    //Unknown errors (bugs)
    console.error("Unhandled error : ", err)

    return new Response(
        JSON.stringify({ error: "Internal Server Error"}),
        {
            status: 500,
            headers: {
                "content-type": "application/json"
            },
        }
    )
}