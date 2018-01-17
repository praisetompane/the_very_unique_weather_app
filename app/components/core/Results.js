let React = require('react');
let QueryString = require('query-string');
let Api = require('../../utils/Api');
let Forecast = require('./Forecast');
let Loading = require('../layout/Loading');

const isArrayEmpty = (array) => array.length <= 0;
const extractForecastDetailsOnDay = (weatherItems, dayDate) => weatherItems.find(x => x.dt_txt === dayDate);

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
        const city = this.extractCity(this.props);
        const dayDate = QueryString.parse(nextProps.location.dayDate);
        Api.retrieveCityWeatherOnADay(city, dayDate.dayDate)
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
                        weatherItems.map(ww =>
                            <Forecast
                                path={this.state.resultsPath}
                                image={`http://openweathermap.org/img/w/${ww.weather[0].icon}.png`}
                                dayDate={ww.dt_txt}
                                city={this.state.city}
                                forecastDetails={extractForecastDetailsOnDay(weatherItems, ww.dt_txt)}
                            />
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