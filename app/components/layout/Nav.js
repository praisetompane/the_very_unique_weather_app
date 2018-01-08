let React = require('react')
let Search = require('./Search')

class Nav extends React.Component {
    render() {
        return (
            <div className='navbar'>
                <h1> The Very Unique Weather App </h1>
                <Search flexDirection='row'/>
            </div>
        )
    }
}

module.exports = Nav;