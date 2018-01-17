let React = require('react');
let NavLink = require('react-router-dom').NavLink;
let PropTypes = require('prop-types');

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            city: ''
        };
    }

    handleCityUpdate = (event) => {
        let value = event.target.value;
        this.setState(() => {
            return {
                city: value
            }
        })
    };

    render() {
        return (
            <div className='search-container'
                 style={{flexDirection: this.props.flexDirection}}>
                <input
                    type='text'
                    className="form-control"
                    id='city'
                    placeholder='Cape Town'
                    autoComplete='off'
                    value={this.state.city}
                    onChange={this.handleCityUpdate}
                >
                </input>
                <NavLink
                    type='button'
                    className='btn btn-success'
                    style={{margin: 10}}
                    to={{
                        pathname: '/results',
                        city: `?city=` + this.state.city
                    }}
                    disabled={!this.state.city}
                >
                    Get Weather
                </NavLink>
            </div>
        )
    }
}

Search.defaultProps = {
    flexDirection: 'row'
};

Search.propTypes = {
    direction: PropTypes.string,
};

module.exports = Search;