const { default: axios } = require("axios");

/**
 *
 * @param {string} api
 * @returns {Promise<{
 *   latitude: Number,
 *   longitude: Number,
 *   regionName: String,
 *   city: String
 * }>}
 */
const getIP = async (ip) => {
        const endpoint = `https://apiip.net/api/check?ip=${ip}&accessKey=${process.env.GETAPIKEY}&fields=latitude,longitude,regionName,city`;
    
        return axios.get(endpoint)
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(e => {
            throw e
        })
};

module.exports = getIP;
