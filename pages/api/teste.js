export default async function handler(req, res) {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    res.status(200).json({ info1: req.connection, info2: req.headers });
}
