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
        const endpoint = `https://apiip.net/api/check?ip=${ip}&accessKey=5c102a0c-5b49-4f76-80d0-77e03524c70b&fields=latitude,longitude,regionName,city`;
    
        return axios.get(endpoint)
        .then(res => {
            return res.data
        })
        .catch(e => {
            throw e
        })
};

module.exports = getIP;
