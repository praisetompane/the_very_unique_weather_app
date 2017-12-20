/*
    Responsibilities:  
        Renders result of the search
*/
let React = require('react')
let queryString = require('query-string')
let Api = require('../utils/Api')

class Results extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            city: '',
            weatherItems: [],
        }
    }

    componentDidMount() {
        const city = queryString.parse(this.props.location.city);
        Api.retrieveWeather(city.city)
            .then((cityWeather) => {
            this.setState(() => {
                return {
                    city,
                    weatherItems: cityWeather.list,
                }
            })
        })
    }

    render() {
        return (
            <div> Results</div>
        )
    }
}


module.exports = Results;