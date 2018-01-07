let React = require('react');
let ReactRouter = require('react-router-dom');
let Router = ReactRouter.BrowserRouter;
let Route = ReactRouter.Route;
let Switch = ReactRouter.Switch;
let Results = require('./Results');
let Home = require('./Home');
let Nav = require('./Nav');
let DayWeatherDetails = require('./DayWeatherDetails');

class App extends React.Component {
    render() {
        return (
            <div className='container'>
                <Router>
                    <div>
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