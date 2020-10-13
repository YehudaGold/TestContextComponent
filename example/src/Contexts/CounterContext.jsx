import {ContextComponent} from '../../../src';

export default class CounterContext extends ContextComponent {

    state = {counter: 0};

    constructor(props) {
        super(props);

        this.increase = this.increase.bind(this);
        this.decrease = this.decrease.bind(this);
    }

    increase() {
        this.setState(state => ({counter: state.counter + 1}));
    }

    decrease() {
        this.setState(state => ({counter: state.counter - 1}));
    }

}