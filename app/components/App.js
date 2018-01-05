let React = require('react');
let ReactRouter = require('react-router-dom');
let Router = ReactRouter.BrowserRouter;
let Route = ReactRouter.Route;
let Switch = ReactRouter.Switch;
let Results = require('./Results');
let Home = require('./Home');
let Nav = require('./Nav');
let DayWeatherDetails = require('./DayWeatherDetails');
/*
 Responsibilities:
 1. Displaying background with a search box and button if state has no weather forecasts
 2. Diplay DayWeatherForecast component for each day of the week
 => Where is going to get the data?: Data should be retrieved from state (the invocation search should have update the state)
 */

/*
 render header separately (This must remain rendered): This is like the navigation
 render default home (Which also has a search box and that cool background)
 render results components
 */
class App extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <div className='home-container'>
                        <Nav />
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route exact path='/results' component={Results}/>
                            <Route exact path='/results/details' component={DayWeatherDetails}/>
                            <Route render={() => <p> Not found </p>}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

module.exports = App;