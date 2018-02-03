let React = require('react');
let ReactRouter = require('react-router-dom');
let Router = ReactRouter.BrowserRouter;
let Route = ReactRouter.Route;
let Switch = ReactRouter.Switch;
let Results = require('../core/Results');
let Home = require('./Home');
let Nav = require('./Nav');
let ForecastDetails = require('../core/ForecastDetails');
let Search = require('./Search');

class App extends React.Component {
    render() {
        return (
            <div className='container'>
                <Router>
                    <div>
                        <Route render={Nav}/>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route exact path='/results' component={Results}/>
                            <Route exact path='/results/details' component={ForecastDetails}/>
                            <Route render={() => <p className='header'> Oops...I can't find that location :( </p>}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

module.exports = App;