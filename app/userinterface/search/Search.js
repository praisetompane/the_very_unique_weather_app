let React = require('react');
let PropTypes = require('prop-types');

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            city: ''
        };
    }

    handleChange = (event) => {
        let value = event.target.value;
        this.setState(() => {
            return {
                city: value
            }
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.city);
    };

    render() {
        return (
            <form className='search-container'
                  style={{flexDirection: this.props.flexDirection}}
                  onSubmit={this.handleSubmit}
            >
                <input
                    type='text'
                    className="form-control"
                    id='city'
                    placeholder='Cape Town'
                    autoComplete='off'
                    value={this.state.city}
                    onChange={this.handleChange}
                    required={true}
                />
                <input
                    type='submit'
                    className='btn btn-success'
                    style={{margin: 10}}
                    value='Get Weather'
                />
                </form>
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

