let React = require('react');
let Search = require('./search/Search');
let Nav = require('./layout/Nav');
let FunctionGenerators = require('../services/FunctionGenerators');

const Home = (props) => {
    return (
        <div className='home-container'>
            <h1 className='header'> Enter a City</h1>
            <Search
                onSubmit={FunctionGenerators.generateHandleSubmit(props)}
                flexDirection='column'/>
        </div>)
};

module.exports = Home;