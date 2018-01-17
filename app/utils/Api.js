'use strict';

let axios = require('axios');
let moment = require('moment');
//TODO should I encrypt these?
let id = "9237bff9d2e49f2cc980297aea363903";
let baseUrl = "https://api.openweathermap.org/data/2.5/forecast";
let path = require('path');

const groupBy = (collection, property) => {
    return collection.reduce((groups, item) => {
        const val = item[property];
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
    }, [])
};

const retrieveDataFromFile = () => require('../data/weather.json');

//TODO is this adequate production error handling?
const handleError = error => console.error(error);

//TODO How do I know that the last item in the list is the latest weather reading, I don't have any ordering?
const extractDayLatestWeatherReadings = weekDayWeather => weekDayWeather[weekDayWeather.length - 1];

const extractWeekDayWeather = (days, dayToExtract) => days[dayToExtract];

const generateISOFormatDay = dayToAdd => moment().add(dayToAdd, 'days').format('YYYY-MM-DD');

const extractLatestWeekDayWeather = (NUMBER_OF_WEATHER_DAYS, weatherByDate) => {
    const latestWeather = [];
    for (let i = 0; i < NUMBER_OF_WEATHER_DAYS; i++) {
        /*
         TODO, there is a potential bug when the service returns the weather from next day onwards
         whilst the client machine is still on the previous day, because generateISOFormatDay() uses
         the client's current day

         SOLUTION: Use OpenWeather API'S current day not client machine?
         */
        const singleWeekDayHourlyWeather = extractWeekDayWeather(weatherByDate, generateISOFormatDay(i));
        latestWeather.push(extractDayLatestWeatherReadings(singleWeekDayHourlyWeather));
    }

    return latestWeather;
};


async function retrieveFiveDayCityWeather(city) {
    const NUMBER_OF_WEEK_DAYS = 5;
    const weather = await retrieveWeather(city);
    //TODO for some reason the original value(array in this case) is mutated and this computation only produces the dates
    weather.map(x => x.dt_txt = moment(x.dt_txt).format('YYYY-MM-DD'));
    const weatherByDate = groupBy(weather, 'dt_txt');
    return extractLatestWeekDayWeather(NUMBER_OF_WEEK_DAYS, weatherByDate);
}

async function retrieveWeather(city) {
    try {
        const apiReq = `${baseUrl}?q=${city},mode=json&appid=${id}`;
        //Use for offline testing
        //const weather = retrieveDataFromFile();
        const weather = await axios.get(apiReq);
        //TODO non success codes?
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
