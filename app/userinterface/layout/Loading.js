let React = require('react');
let PropTypes = require('prop-types');

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text
        }
    }

    componentDidMount() {
        let terminalText = this.props.text + '...';
        this.interval = window.setInterval(() => {
            if (this.state.text === terminalText) {
                this.setState(() => {
                    return {
                        text: this.props.text
                    }
                })
            } else {
                this.setState((previousState) => {
                    return {
                        text: previousState.text + '.'
                    }
                })
            }
        }, 100);
    };

    componentWillUnmount() {
        window.clearInterval(this.interval)
    };

    render() {
        return <p className='header'>{this.state.text}</p>;
    }

}

Loading.propTypes = {
    text: PropTypes.string
};

Loading.defaultProps = {
    text: 'Loading'
};

module.exports = Loading;