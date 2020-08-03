import ContextComponent from '../../../src';

const second = 1000;

export default class TimeContext extends ContextComponent {

    state = {timeFromMount: 0};

    componentDidMount() {
        this.mountTime = Date.now();
        this.timerID = setInterval(
            () => this._tick(),
            second
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    _tick = () => {
        this.setState({timeFromMount: Date.now() - this.mountTime});
    };

}