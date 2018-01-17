'use strict';

let axios = require('axios');
let moment = require('moment');
let path = require('path');

let id = "9237bff9d2e49f2cc980297aea363903";
let baseUrl = "https://api.openweathermap.org/data/2.5/forecast";

const groupBy = (collection, property) => {
    return collection.reduce((groups, item) => {
        const val = moment(item[property]).format('YYYY-MM-DD');
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
    }, [])
};

const retrieveDataFromFile = () => require('../data/weather.json');

const handleError = error => console.error(error);

const compareDates = (a, b) => {
    if (moment(a.dt_txt) < moment(b.dt_txt)) {
        return -1;
    }
    if (moment(a.dt_txt) > moment(b.dt_txt)) {
        return 1;
    }
    return 0;
};

const extractDayLatestWeatherReadings = weekDayWeather => weekDayWeather.sort(compareDates).pop();

const generateNthDate = dayToAdd => moment().add(dayToAdd, 'days').format('YYYY-MM-DD');

const extractLatestForecast = (weatherByDate) => {
    const NUMBER_OF_WEEK_DAYS = 5;
    const latestWeather = [];
    /* NOTE
     Array.map does not work because the array grouped by date does not have 0,1...array.length - 1 indices
     as a result it does not work*, hence I'm falling back to iteration
     */
    for (let i = 0; i < NUMBER_OF_WEEK_DAYS; i++) {
        const hourlyForecasts = weatherByDate[generateNthDate(i)];
        const latest = extractDayLatestWeatherReadings(hourlyForecasts);
        latest.dt_txt = moment(latest.dt_txt).format('YYYY-MM-DD');
        latestWeather.push(latest);
    }
    return latestWeather;
};


async function retrieveFiveDayCityWeather(city) {
    const weather = await retrieveWeather(city);
    const weatherByDate = groupBy(weather, 'dt_txt');
    return extractLatestForecast(weatherByDate);
}

async function retrieveWeather(city) {
    try {
        const apiReq = `${baseUrl}?q=${city},mode=json&appid=${id}`;
        //Use for offline testing
        //const weather = retrieveDataFromFile();
        const weather = await axios.get(apiReq);
        return weather.data.list;
    }
    catch (error) {
        handleError(error);
    }
}

async function retrieveCityWeatherOnADay(city, dayDate) {
    const weather = await retrieveWeather(city);
    return weather.filter(x => moment(x.dt_txt).format('YYYY-MM-DD') == dayDate);
}

module.exports = {
    retrieveFiveDayCityWeather,
    retrieveCityWeatherOnADay
};
