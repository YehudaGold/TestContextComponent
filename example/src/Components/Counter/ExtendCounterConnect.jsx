import PropTypes from 'prop-types';
import React from 'react';

import ExtendCounterContext from '../../Contexts/ExtendCounterContext';
import Button from '../Generic/Button';

const ExtendCounterConnect = ({counter, decrease, increase, setToZero}) =>
    <div className="dark">
        ExtendCounterConnect
        <div className="value">{`value: ${counter}`}</div>
        <Button handelClick={increase} text="increase" />
        <Button handelClick={decrease} text="decrease (override to-2)" />
        <Button handelClick={setToZero} text="setToZero (extended)" />
    </div>;
ExtendCounterConnect.propTypes = {
    counter: PropTypes.number.isRequired,
    decrease: PropTypes.func.isRequired,
    increase: PropTypes.func.isRequired,
    setToZero: PropTypes.func.isRequired
};

const mapContextToProps = context => ({
    counter: context.counter,
    decrease: context.decrease,
    increase: context.increase,
    setToZero: context.setToZero
});

export default ExtendCounterContext.connect(ExtendCounterConnect, mapContextToProps);