let React = require('react');
let QueryString = require('query-string');

class ForecastDetails extends React.Component {
    constructor(props) {
        super(props);
        const city = QueryString.parse(this.props.location.city).city;
        const forecastDetails = this.props.location.forecastDetails;
        this.state = {
            city: city,
            icon: forecastDetails.icon,
            date: forecastDetails.date,
            description: forecastDetails.description,
            minimumTemperature: forecastDetails.minimumTemperature,
            maximumTemperature: forecastDetails.maximumTemperature,
            humidity: forecastDetails.humidity,
        };
    }
    render() {
        return <div className='forecast-details'>
            <img src={this.state.icon}/>
            <p>{this.state.date}</p>
            <p>{this.state.city}</p>
            <p>{this.state.description}</p>
            <p>minimum temp: {this.state.minimumTemperature} </p>
            <p>maximum temp: {this.state.maximumTemperature} </p>
            <p>humidity: {this.state.humidity}</p>
        </div>
    }
}

module.exports = ForecastDetails;