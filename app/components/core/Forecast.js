let React = require('react');
let PropTypes = require('prop-types');
let NavLink = require('react-router-dom').NavLink;

function Forecast({resultsPath, forecastDetails}) {
    return <NavLink
        className='day-forecast-container link-without-underline'
        to={{
            pathname: resultsPath,
            forecastDetails: forecastDetails
        }}>
        <img src={forecastDetails.icon}/>
        <h2>{forecastDetails.date}</h2>
    </NavLink>
}

Forecast.propTypes = {
    image: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    forecastDetails: PropTypes.object,
};

module.exports = Forecast;

