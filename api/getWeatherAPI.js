const { default: axios } = require("axios");

/**
 * 
 * @param {Number} latitude 
 * @param {Number} longitude 
 * @returns {Promise<{
 *   code: Number,
 *   temp: Number,
 *   condition_slug: 'storm'| 'snow'|'hail'|'rain'|'fog'|'clear_day'|'clear_night'|'cloud'|'cloudly_day'|'cloudly_night'|'none_day'|'none_night',
 *   icon: SVG
 * }>}
 */
const getWeatherAPI = async (latitude, longitude) => {
    const options = {
        method: "GET",
        url: "https://api.hgbrasil.com/weather",
        params: {
            lat: latitude,
            lon: longitude,
            array_limit: 1,
            fields: "only_results,temp, condition_slug",
            key: process.env.GETWEATHERAPIKEY,
        },
    };

    try {
        const response = await axios.request(options);
        const data = response.data
        const icon = await axios.get(
            `https://assets.hgbrasil.com/weather/icons/conditions/${data.condition_slug}.svg`
        );

        return {
            code: 'OK',
            ...data,
            icon: icon.data
        }
    } catch (error) {
        console.error(error);
    }

    
    // const ENDPOINT = `https://api.hgbrasil.com/weather?array_limit=1&fields=only_results,temp,city_name,forecast,max,min,date&key=${process.env.GETWEATHERAPIKEY}&lat=${latitude}&lon=${longitude}`;

    // const res = axios.get(ENDPOINT).then(e => console.log(e.data, 'res'))
}

export default getWeatherAPI