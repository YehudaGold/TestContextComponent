import PropTypes from 'prop-types';
import React from 'react';

import ThemeContext from '../../Contexts/ThemeContext';
import Button from '../Generic/Button';

const ThemeConnectWithProps = ({contextTheme, theme, toggleTheme}) =>
    <div className={theme}>
        ThemeConnectWithProps
        <p>{`context theme: ${contextTheme}`}</p>
        <Button handelClick={toggleTheme} text="toggle context theme" />
    </div>;
ThemeConnectWithProps.propTypes = {
    contextTheme: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    toggleTheme: PropTypes.func.isRequired
};

const mapContextToProps = (context, ownProps) => ({
    contextTheme: context.theme,
    theme: ownProps.theme === 'dark' ? context.theme : ownProps.theme,
    toggleTheme: context.toggleTheme
});

export default ThemeContext.connect(ThemeConnectWithProps, mapContextToProps);