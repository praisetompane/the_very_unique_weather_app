let React = require('react');
let Search = require('./Search');
let FunctionGenerators = require('../../utils/FunctionGenerators');

const Nav = (props) => {
    return (
        <div className='navbar'>
            <h1> The Very Unique Weather App ;)</h1>
            <Search
                onSubmit={FunctionGenerators.generateHandleSubmit(props)}
                flexDirection='row'/>
        </div>
    )
};


module.exports = Nav;