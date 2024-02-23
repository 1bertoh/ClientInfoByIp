import getIP from "@/api/getIP";
import getWeatherAPI from "@/api/getWeatherAPI";

import Cors from "cors";
import initMiddleware from "@/utils/init-middleware";
import getIsOnWaterAPI from "@/api/getIsOnWaterAPI";

const cors = initMiddleware(
    Cors({
        methods: ["GET", "POST", "OPTIONS"],
    })
);

export default async function handler(req, res) {
    await cors(req, res);

    const ip =
        req.headers["x-real-ip"] ||
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress;

    const userInfo = await getIP(ip);
    const lat = userInfo.latitude;
    const lon = userInfo.longitude;
    const isOnWater = await getIsOnWaterAPI(lat, lon)

    const weather = await getWeatherAPI(lat, lon);

    res.status(200).json({ ip, userInfo, isOnWater, weather });
}
