let React = require('react');
let PropTypes = require('prop-types');
let NavLink = require('react-router-dom').NavLink;

//TODO we need to fix this hack : weatherItems.filter(x => x.dt_txt === dayDate)[0]
function DayWeatherSummary({path, image, heading, dayDate, city, weatherItems}) {
    const dayWeatherDetails = weatherItems.filter(x => x.dt_txt === dayDate)[0];
    return <NavLink
        className="dayContainer"
        to={{
            pathname: path,
            image: `?image=` + image,
            dayDate: `?dayDate=` + dayDate,
            city: `?city=` + city.city,
            dayWeatherDetails: dayWeatherDetails
        }}>
        <img src={image}/>
        <h2>{heading}</h2>
    </NavLink>
}

DayWeatherSummary.propsTypes = {
    image: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
};

module.exports = DayWeatherSummary;

