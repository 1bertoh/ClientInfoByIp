const axios = require('axios');

/**
 * 
 * @param {int} latitute 
 * @param {int} longitute 
 */
const  getIsOnWaterAPI = async (latitute, longitute) => {

    const options = {
        method: "GET",
        url: "https://isitwater-com.p.rapidapi.com/",
        params: {
            latitude: latitute,
            longitude: longitute,
        },
        headers: {
            "X-RapidAPI-Key":process.env.RAPIDAPIKEY,
            "X-RapidAPI-Host": "isitwater-com.p.rapidapi.com",
        },
    };

    try {
        const response = await axios.request(options);
        const data = response.data

        return {
            code: 'OK',
            isOnWater: data.water
        }
    } catch (error) {
        console.error(error);
    }
}

export default getIsOnWaterAPI