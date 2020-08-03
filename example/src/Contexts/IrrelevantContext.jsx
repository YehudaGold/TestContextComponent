import ContextComponent from '../../../src';

export default class IrrelevantContext extends ContextComponent {

    state = {theme: 'dark', irrelevant: 'a'};

    toggleTheme = () => {
        this.setState(state => (state.theme === 'dark' ? {theme: 'light'} : {theme: 'dark'}));
    };

    toggleIrrelevant = () => {
        this.setState(state => (state.irrelevant === 'a' ? {irrelevant: 'b'} : {irrelevant: 'a'}));
    };

}