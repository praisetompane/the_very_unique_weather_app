/*
    Form Input

    Behaviours:
        Update target location in state when user types value
*/

/*
    Form Button
    Behaviours:
        1. Take target location in state
        2. Invoke a 'Weather' service with the target location
        3. Update state with the weather forecast data
*/
let React = require('react')
let NavLink = require('react-router-dom').NavLink

class Search extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            city: ''
        }

        //TODO Research indepth again about why this is needed?
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        //TODO Research indepth again about why this is needed?
        let value = event.target.value
        this.setState(() => {
            return {
                city: value
            }
        })
    }

    render() {
        // Find out what this match is and how it gets injects
        let match = this.props.match
        return (
            <div className='city-container'>
                <input
                    id='city'
                    placeholder='Cape Town'
                    type='text'
                    autoComplete='off'
                    value={this.state.city}
                    onChange={this.handleChange}
                >
                </input>
                <NavLink
                    className='button btn-success'
                    to={{
                        pathname: '/results',
                        city: `?city=` + this.state.city
                    }}
                    type='submit'
                    disabled={!this.state.city}
                >
                    Get Weather
                </NavLink>
            </div>
        )
    }
}

module.exports = Search;