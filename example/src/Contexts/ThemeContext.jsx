import {ContextComponent} from '../../../src';

export default class ThemeContext extends ContextComponent {

    state = {theme: 'dark'};

    toggleTheme = () => {
        this.setState(state => ({theme: state.theme === 'dark' ? 'light' : 'dark'}));
    };

}