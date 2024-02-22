export async function GET(req) {
    console.log('req', req)
    const data = {
        ok: true,
        ip: req.query?.clientIp ?? "127.0.0.1",
        message: "Hello from the API",
    };
    return new NextResponse(JSON.stringify(data, null, 2));
}
