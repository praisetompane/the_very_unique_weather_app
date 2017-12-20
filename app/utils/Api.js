'user strict';

let axios = require('axios')

//TODO should I encrypt these?
let id = "9237bff9d2e49f2cc980297aea363903"
let baseUrl = "https://api.openweathermap.org/data/2.5/forecast"


//TODO consider using City ID : I would need to implement some mapping from the param to the IDs provided in the JSON file
//city name = parameter
//q={city name},{country code}&mode=json


async function retrieveWeather(city) {
    try{
        const apiReq = `${baseUrl}?q=${city},mode=json&appid=${id}`;
        const weather = await axios.get(apiReq);
        return weather.data;
    }
    catch(error) {
        handleError(error)
    }
};

const handleError = error => {
    console.warn(error);
    return null;
};

module.exports = {
    retrieveWeather,
};
