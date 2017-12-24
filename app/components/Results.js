/*
    Responsibilities:  
        Renders result of the search
*/
let React = require('react');
let queryString = require('query-string');
let Api = require('../utils/Api');
let DayWeatherSummary = require('./DayWeatherSummary');
let R = require('ramda');

class Results extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            city: '',
            weatherItems: [],
            loading: true
        };

/*
        TODO use Ramda or any othe JS Functional libraries to group the results into days
        if you think that will make consuming the data better for a user
        this.state.weatherItems.prototype.groupBy = (property) => {
            return this.reduce((groups, item) => {
                const val = item[property];
                groups[val] = groups[val] || [];
                groups[val].push(item);
                return groups;
            },{})
        };*/
    }

    componentDidMount() {
        const city = queryString.parse(this.props.location.city);
        //TODO add custom groupBy until I pull in appropriate library
        Api.retrieveWeather(city.city)
            .then((cityWeather) => {
            this.setState(() => {
                return {
                    city,
                    weatherItems: cityWeather.list,
                    loading: false,
                }
            })
        })

    }

    render() {
        if(this.state.loading) {
            return  <div> Loading </div>
        }
        return (
            <div>
                <h1 className='forecast-header'>{this.state.city.city}</h1>
                <div className="forecast-container">
                        {
                            this.state.weatherItems.map(w =>
                                <DayWeatherSummary image = {`http://openweathermap.org/img/w/${w.weather[0].icon}.png`}
                                                   heading = {w.dt_txt}/>)
                        }

                </div>

            </div>
        )
    }
}

module.exports = Results;