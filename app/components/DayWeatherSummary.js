let React = require('react');
let PropTypes = require('prop-types')
let NavLink = require('react-router-dom').NavLink;

/*Add on click that passes the 'day' in the url(used later in the results component to
 determine which API function to call
 */
function DayWeatherSummary({image, heading, dayDate, city}) {
    return <NavLink
        className="dayContainer"
        to={{
            pathname: '/results',
            dayDate: `?dayDate=` + dayDate,
            city: `?city=` + city.city
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

