import PropTypes from 'prop-types';
import React from 'react';

import CounterContext from '../../Contexts/CounterContext';
import Button from '../Generic/Button';

const CounterConnect = ({counter, decrease, increase}) =>
    <div className="dark">
        CounterConnect
        <div className="value">{`value: ${counter}`}</div>
        <Button handelClick={increase} text="increase" />
        <Button handelClick={decrease} text="decrease" />
    </div>;
CounterConnect.propTypes = {
    counter: PropTypes.number.isRequired,
    decrease: PropTypes.func.isRequired,
    increase: PropTypes.func.isRequired
};

const mapContextToProps = context => ({
    counter: context.counter,
    decrease: context.decrease,
    increase: context.increase
});

export default CounterContext.connect(CounterConnect, mapContextToProps);