let React = require('react');
let Api = require('../../services/openweathermap');
let Forecast = require('../forecast/Forecast');
let Loading = require('../layout/Loading');

const isArrayEmpty = (array) => array.length <= 0;
const extractForecastDetails = (weatherItems, date, city) => {
    const dayWeather = weatherItems.find(x => x.dt_txt === date);
    const weather = dayWeather.weather.pop();
    const mainWeather = dayWeather.main;
    return {
        city: city,
        date: dayWeather.dt_txt,
        icon: `https://openweathermap.org/img/w/${weather.icon}.png`,
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
        const forecastDetails = nextProps.location.forecastDetails;
        const city = forecastDetails.city;
        Api.retrieveCityWeatherOnADay(city, forecastDetails.date)
            .then((weatherItems) => {
                this.setState(() => {
                    return {
                        city,
                        weatherItems,
                        loading: false,
                        resultsPath: 'results/details',
                    }
                })
            })
            .catch(() => this.handleError());
    }

    componentDidMount() {
        const city = this.props.location.city;
        Api.retrieveFiveDayCityWeather(city)
            .then((weatherItems) => {
                this.setState(() => {
                    return {
                        city,
                        weatherItems,
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
                                const forecastDetails = extractForecastDetails(weatherItems, ww.dt_txt, this.state.city);
                                return <Forecast
                                    key={ww.dt_txt}
                                    resultsPath={this.state.resultsPath}
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