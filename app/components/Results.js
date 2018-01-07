let React = require('react');
let QueryString = require('query-string');
let Api = require('../utils/Api');
let DayWeatherSummary = require('./DayWeatherSummary');
let Loading = require('./Loading');

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            weatherItems: [],
            loading: true,
            resultsPathName: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        const city = QueryString.parse(this.props.location.city);
        const dayDate = QueryString.parse(nextProps.location.dayDate);
        Api.retrieveCityWeatherOnDay(city.city, dayDate.dayDate)
            .then((cityWeather) => {
                console.log('cityweather', cityWeather);
                this.setState(() => {
                    return {
                        city,
                        weatherItems: cityWeather,
                        loading: false,
                        resultsPathName: 'results/details'
                    }
                })
            });
    }

    componentDidMount() {
        const city = QueryString.parse(this.props.location.city);
        Api.retrieveFiveDayWeather(city.city)
            .then((cityWeather) => {
                this.setState(() => {
                    return {
                        city,
                        weatherItems: cityWeather,
                        loading: false,
                        resultsPathName: 'results',
                    }
                })
            });
    }

    render() {
        if (this.state.loading) return <Loading text='Getting you the weather'/>;
        else return (
            <div>
                <h1 className='header'>{this.state.city.city}</h1>
                <div className="forecast-container">
                    {
                        this.state.weatherItems.map(ww =>
                            <DayWeatherSummary
                                path={this.state.resultsPathName}
                                image={`http://openweathermap.org/img/w/${ww.weather[0].icon}.png`}
                                heading={ww.dt_txt}
                                dayDate={ww.dt_txt}
                                city={this.state.city}
                                weatherItems={this.state.weatherItems}
                            />
                        )
                    }
                </div>
            </div>
        )
    }
}

module.exports = Results;