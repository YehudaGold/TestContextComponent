import PropTypes from 'prop-types';
import React from 'react';

import {connect} from '../../../../src';
import CounterContext from '../../Contexts/CounterContext';
import ThemeContext from '../../Contexts/ThemeContext';
import Button from '../Generic/Button';

const MultipleConnect = ({counter, decrease, increase, theme, toggleTheme}) =>
    <div className={theme}>
        MultipleConnect
        <div className="value">{`value: ${counter}`}</div>
        <Button handelClick={increase} text="increase" />
        <Button handelClick={decrease} text="decrease" />
        <Button handelClick={toggleTheme} text="toggle theme" />
    </div>;
MultipleConnect.propTypes = {
    counter: PropTypes.number.isRequired,
    decrease: PropTypes.func.isRequired,
    increase: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired,
    toggleTheme: PropTypes.func.isRequired
};

const mapContextsToProps = ([counterContext, themeContext]) => ({
    counter: counterContext.counter,
    decrease: counterContext.decrease,
    increase: counterContext.increase,
    theme: themeContext.theme,
    toggleTheme: themeContext.toggleTheme
});

export default connect(MultipleConnect, [CounterContext, ThemeContext], mapContextsToProps);