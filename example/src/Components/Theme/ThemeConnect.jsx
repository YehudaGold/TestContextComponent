import PropTypes from 'prop-types';
import React from 'react';

import ThemeContext from '../../Contexts/ThemeContext';
import Button from '../Generic/Button';

const ThemeConnect = ({toggleTheme, theme}) =>
    <div className={theme}>
        ThemeConnect
        <Button handelClick={toggleTheme} text="toggle theme" />
    </div>;
ThemeConnect.propTypes = {
    theme: PropTypes.string.isRequired,
    toggleTheme: PropTypes.func.isRequired
};

const mapContextToProps = context => ({
    theme: context.theme,
    toggleTheme: context.toggleTheme
});

export default ThemeContext.connect(ThemeConnect, mapContextToProps);