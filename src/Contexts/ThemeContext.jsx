/* eslint-disable react/no-unused-state */
import {Component} from 'react';
import {createContext} from '../lib';

class ThemeContext extends Component {
    state = {theme: 'dark', size: 10}

    setTheme = (theme) => {
        this.setState({theme});
    }

    setSize = (Size) => {
        this.setState({Size});
    }
}

export default createContext(ThemeContext);