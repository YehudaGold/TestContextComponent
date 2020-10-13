import {ContextComponent} from '../../../src';

export default class ThemeContext extends ContextComponent {

    state = {theme: 'dark'};

    toggleTheme = () => {
        this.setState(state => (state.theme === 'dark' ? {theme: 'light'} : {theme: 'dark'}));
    };

}