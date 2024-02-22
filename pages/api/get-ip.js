export default async function handler (req, res)  {
    const ip = req.connection.remoteAddress;
    console.log(ip, 'dentro da chamadaaa------------')
    res.status(200).json({ ip:ip });
};

