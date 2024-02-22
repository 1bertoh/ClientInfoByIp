const axios = require('axios');

/**
 * 
 * @param {int} latitute 
 * @param {int} longitute 
 */
const  getIsOnWaterAPI = async (latitute, longitute) => {

    const options = {
        method: 'GET',
        url: 'https://isitwater-com.p.rapidapi.com/',
        params: {
            latitude: latitute,
            longitude: longitute
        },
        headers: {
            'X-RapidAPI-Key': 'ef830e00a4msha12c145d8fe1be7p19f3d2jsnfb619da8dd44',
            'X-RapidAPI-Host': 'isitwater-com.p.rapidapi.com'
        }
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