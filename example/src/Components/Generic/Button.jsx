import PropTypes from 'prop-types';
import React from 'react';

const Button = ({handelClick, text}) =>
    <div className="button" onClick={handelClick}>
        {text}
    </div>;
Button.propTypes = {
    handelClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};

export default React.memo(Button);