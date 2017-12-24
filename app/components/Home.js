let React = require('react')
let Search = require('./Search')
let Nav = require('./Nav')

//TODO Add background image pattern
class Home extends React.Component {
    render() {
        return (
            <div>
                <img/>
                <Search />
            </div>
        )
    }
}

module.exports = Home;