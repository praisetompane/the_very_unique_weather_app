let React = require('react');
let Search = require('./Search');
let Nav = require('./Nav');

class Home extends React.Component {
    render() {
        return (
            <div className='home-container'>
                <h1 className='header'> Enter a City</h1>
                <Search flexDirection='column'/>
            </div>
        )
    }
}

module.exports = Home;