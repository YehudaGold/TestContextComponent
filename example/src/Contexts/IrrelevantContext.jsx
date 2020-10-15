import {ContextComponent} from '../../../src';

export default class IrrelevantContext extends ContextComponent {

    state = {theme: 'dark', irrelevant: 'a'};

    toggleTheme = () => {
        this.setState(state => ({theme: state.theme === 'dark' ? 'light' : 'dark'}));
    };

    toggleIrrelevant = () => {
        this.setState(state => ({irrelevant: state.irrelevant === 'a' ? 'b' : 'a'}));
    };

}