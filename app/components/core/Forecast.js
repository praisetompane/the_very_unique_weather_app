let React = require('react');
let PropTypes = require('prop-types');
let NavLink = require('react-router-dom').NavLink;

function Forecast({resultsPath, city, forecastDetails}) {
    return <NavLink
        className="day-forecast-container"
        to={{
            pathname: resultsPath,
            city: `?city=${city}`,
            forecastDetails: forecastDetails
        }}>
        <img src={forecastDetails.icon}/>
        <h2>{forecastDetails.date}</h2>
    </NavLink>
}

Forecast.propsTypes = {
    image: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    forecastDetails: PropTypes.object.isRequired,
};

module.exports = Forecast;

