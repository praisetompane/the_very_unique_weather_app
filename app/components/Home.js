let React = require('react')
let Search = require('./Search')
let Nav = require('./Nav')

class Home extends React.Component {
    render() {
        return (
            <Search />
        )
    }
}

module.exports = Home;