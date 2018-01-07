let React = require('react');
let QueryString = require('query-string');

class DayWeatherDetails extends React.Component {
    constructor(props) {
        super(props);
        const image = QueryString.parse(this.props.location.image);
        const dayDate = QueryString.parse(this.props.location.dayDate);
        const city = QueryString.parse(this.props.location.city);
        const dayWeatherDetails = this.props.location.dayWeatherDetails;
        this.state = {
            image: image.image,
            dayDate: dayDate.dayDate,
            city: city.city,
            dayWeatherDetails: dayWeatherDetails,
        };
    }
    //TODO we need to fix this hack : this.state.dayWeatherDetails.weather[0].description
    render() {
        return <div className='forecast-details'>
            <img src={this.state.image}/>
            <p>{this.state.dayDate}</p>
            <p>{this.state.city}</p>
            <p>{this.state.dayWeatherDetails.weather[0].description}</p>
            <p>min temp: {this.state.dayWeatherDetails.main.temp_min} </p>
            <p>max temp: {this.state.dayWeatherDetails.main.temp_max} </p>
            <p>humidity: {this.state.dayWeatherDetails.main.humidity}</p>
        </div>
    }
}

module.exports = DayWeatherDetails;