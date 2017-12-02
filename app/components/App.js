let React = require('react')
let ReactDOM = require('react-dom')

/*
    Responsibilities:
    1. Displaying background with a search box and button if state has no weather forecasts 
    2. Diplay DayWeatherForecast component for each day of the week
            => Where is going to get the data?: Data should be retrieved from state (the invocation search should have update the state)
*/

class App extends React.Component {
    render() {
        return (
            <div> The weather is coming </div>
        )
    }
}

module.exports = App;