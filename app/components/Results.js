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
            city: ''
        }
    }

    componentDidMount() {
        let city = queryString.parse(this.props.location.city)
        console.log(city)
    }

    render() {
        return (
            <div> Results </div>
        )
    }
}


module.exports = Results;