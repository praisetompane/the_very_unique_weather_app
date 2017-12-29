let React = require('react');
let queryString = require('query-string');
let Api = require('../utils/Api');
let DayWeatherSummary = require('./DayWeatherSummary');

class Results extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            city: '',
            weatherItems: [],
            loading: true
        };
    }

    componentDidMount() {
        const city = queryString.parse(this.props.location.city);
        //TODO add custom groupBy until I pull in appropriate library
        Api.retrieveFiveDayWeather(city.city)
            .then((cityWeather) => {
                this.setState(() => {
                    return {
                        city,
                        weatherItems: cityWeather,
                        loading: false,
                    }
                })
            })
    }

    render() {
        if (this.state.loading) return <div> Loading </div>;
        else return (
            <div>
                <h1 className='forecast-header'>{this.state.city.city}</h1>
                <div className="forecast-container">
                    {
                        this.state.weatherItems.map(ww =>
                            <DayWeatherSummary
                                image={`http://openweathermap.org/img/w/${ww.weather[0].icon}.png`}
                                heading={ww.dt_txt}
                            />
                        )
                    }
                </div>
            </div>
        )
    }
}

module.exports = Results;