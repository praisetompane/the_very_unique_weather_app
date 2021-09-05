'use strict';
/**
 * Created by Praise on 2018/02/03.
 */

function generateHandleSubmit(props) {
    return (city) => {
        props.history.push({
            pathname: 'results',
            city: city
        })
    }
}

module.exports = {
    generateHandleSubmit
};