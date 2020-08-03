import React from 'react';

import ThemeContext from '../../Contexts/ThemeContext';
import Button from '../Generic/Button';

const ThemeConsumer = () =>
    <ThemeContext.Consumer>
        {({theme, toggleTheme}) =>
            <div className={theme}>
                ThemeConsumer
                <Button handelClick={toggleTheme} text="toggle theme" />
            </div>}
    </ThemeContext.Consumer>;

export default ThemeConsumer;