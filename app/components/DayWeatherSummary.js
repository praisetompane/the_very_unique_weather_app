let React = require('react');
let PropTypes = require('prop-types')

function DayWeatherSummary({image, heading}) {
    return <div className="dayContainer">
        <img src={image}/>
        <h2>{heading}</h2>
    </div>
}

DayWeatherSummary.propsTypes = {
    image: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
};

module.exports = DayWeatherSummary;

