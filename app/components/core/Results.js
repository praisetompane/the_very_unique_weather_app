let React = require('react');
let QueryString = require('query-string');
let Api = require('../../utils/Api');
let Forecast = require('./Forecast');
let Loading = require('../layout/Loading');

const isArrayEmpty = (array) => array.length <= 0;
const extractForecastDetails = (weatherItems, dayDate) => {
    const dayWeather = weatherItems.find(x => x.dt_txt === dayDate);
    const weather = dayWeather.weather.pop();
    const mainWeather = dayWeather.main;
    return {
        date: dayWeather.dt_txt,
        icon: `http://openweathermap.org/img/w/${weather.icon}.png`,
        description: weather.description,
        minimumTemperature: mainWeather.temp_min,
        maximumTemperature: mainWeather.temp_max,
        humidity: mainWeather.humidity,
    };
};

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            weatherItems: [],
            loading: true,
            resultsPath: '',
        };
    }

    extractCity = (props) => QueryString.parse(props.location.city).city;

    handleError = () => this.setState(() => {
        return {
            loading: false
        }
    });

    componentWillReceiveProps(nextProps) {
        this.setState(() => {
            return {
                loading: true
            }
        });
        const city = this.extractCity(nextProps);
        Api.retrieveCityWeatherOnADay(city, nextProps.location.forecastDetails.date)
            .then((cityWeather) => {
                this.setState(() => {
                    return {
                        city,
                        weatherItems: cityWeather,
                        loading: false,
                        resultsPath: 'results/details',
                    }
                })
            })
            .catch(() => this.handleError());
    }

    componentDidMount() {
        const city = this.extractCity(this.props);
        Api.retrieveFiveDayCityWeather(city)
            .then((cityWeather) => {
                this.setState(() => {
                    return {
                        city,
                        weatherItems: cityWeather,
                        loading: false,
                        resultsPath: 'results',
                    }
                })
            })
            .catch(() => this.handleError());
    }

    render() {
        const weatherItems = this.state.weatherItems;
        const loading = this.state.loading;
        if (loading) {
            return <Loading text='Getting you the weather'/>;
        }
        else if (!loading && !isArrayEmpty(weatherItems)) return (
            <div>
                <h1 className='header'>{this.state.city}</h1>
                <div className="forecast-container">
                    {
                        weatherItems.map(ww => {
                                const forecastDetails = extractForecastDetails(weatherItems, ww.dt_txt);
                                return <Forecast
                                    resultsPath={this.state.resultsPath}
                                    city={this.state.city}
                                    forecastDetails={forecastDetails}
                                />
                            }
                        )
                    }
                </div>
            </div>
        );
        else {
            return <h1 className='header'>Oh dear...I failed to get your weather :(.
                <br/>Please check your internet connection.</h1>;
        }
    }
}

module.exports = Results;