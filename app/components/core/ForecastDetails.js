let React = require('react');

const ForecastDetails = (props) => {
    const forecastDetails = props.location.forecastDetails;
    return <div className='forecast-details'>
        <img src={forecastDetails.icon}/>
        <p>{forecastDetails.date}</p>
        <p>{forecastDetails.city}</p>
        <p>{forecastDetails.description}</p>
        <p>minimum temp: {forecastDetails.minimumTemperature}°C </p>
        <p>maximum temp: {forecastDetails.maximumTemperature}°C </p>
        <p>humidity: {forecastDetails.humidity}</p>
    </div>
};

module.exports = ForecastDetails;
