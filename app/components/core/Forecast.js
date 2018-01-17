let React = require('react');
let PropTypes = require('prop-types');
let NavLink = require('react-router-dom').NavLink;

function Forecast({path, image, dayDate, city, forecastDetails}) {
    return <NavLink
        className="day-forecast-container"
        to={{
            pathname: path,
            image: `?image=` + image,
            dayDate: `?dayDate=` + dayDate,
            city: `?city=` + city,
            forecastDetails: forecastDetails
        }}>
        <img src={image}/>
        <h2>{dayDate}</h2>
    </NavLink>
}

Forecast.propsTypes = {
    image: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
};

module.exports = Forecast;

