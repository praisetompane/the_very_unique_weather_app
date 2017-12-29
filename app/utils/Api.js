'user strict';

let axios = require('axios');
let moment = require('moment');
//TODO should I encrypt these?
let id = "9237bff9d2e49f2cc980297aea363903";
let baseUrl = "https://api.openweathermap.org/data/2.5/forecast";
let path = require('path');

//TODO consider using City ID : I would need to implement some mapping from the param to the IDs provided in the JSON file
//city name = parameter
//q={city name},{country code}&mode=json

const groupBy = (collection, property) => {
    return collection.reduce((groups, item) => {
        const val = item[property];
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
    }, [])
};

const retrieveDataFromFile = () => require('../data/weather.json');

const handleError = error => console.warn(error);

//TODO How do I know tht the last item in the list is the latest weather readns, I don't have any ordering?
const extractDayLatestWeatherReadings = weekDayWeather => weekDayWeather[weekDayWeather.length - 1];

const extractWeekDay = (days, dayToExtract) => days[dayToExtract];

const generateISOFormatDay = dayToAdd => moment().add(dayToAdd, 'days').format('YYYY-MM-DD');

async function retrieveFiveDayWeather(city) {
    try {
        const NUMBER_OF_WEATHER_DAYS = 5;
        const apiReq = `${baseUrl}?q=${city},mode=json&appid=${id}`;
        //const weather = retrieveDataFromFile();
        //TODO revert back to online get later
        const weather = await axios.get(apiReq);
        const fiveDayWeatherReadings = weather.data.list;
        //TODO for some reason the original value(array in this case) is mutated and this computation only produces the dates
        fiveDayWeatherReadings.map(x => x.dt_txt = moment(x.dt_txt).format('YYYY-MM-DD'));
        const fiveDayWeatherReadingsGroupedByDay = groupBy(fiveDayWeatherReadings, 'dt_txt');

        const latestWeather = [];
        for (let i = 0; i < NUMBER_OF_WEATHER_DAYS; i++) {
            const singleWeekDayHourlyWeather = extractWeekDay(fiveDayWeatherReadingsGroupedByDay, generateISOFormatDay(i));
            latestWeather.push(extractDayLatestWeatherReadings(singleWeekDayHourlyWeather));
        }
        return latestWeather;
    }
    catch (error) {
        retrieveDataFromFile();
        handleError(error);
    }
}

module.exports = {
    retrieveFiveDayWeather,
};
