let React = require('react')
let Search = require('./Search')

class Nav extends React.Component {
    render() {
        return (
            <div>
                <h1> The Very Unique Weather App </h1>
                <Search />
            </div>
        )
    }
}

module.exports = Nav;