let React = require('react');

const ForecastDetails = (props) => {
    const forecastDetails = props.location.forecastDetails;
    return <div className='forecast-details'>
        <img src={forecastDetails.icon}/>
        <p>{forecastDetails.date}</p>
        <p>{forecastDetails.city}</p>
        <p>{forecastDetails.description}</p>
        <p>minimum temp: {forecastDetails.minimumTemperature} </p>
        <p>maximum temp: {forecastDetails.maximumTemperature} </p>
        <p>humidity: {forecastDetails.humidity}</p>
    </div>
};

module.exports = ForecastDetails;
