import PropTypes from 'prop-types';
import React from 'react';

import TimeContext from '../../Contexts/TimeContext';

const second = 1000;

const TimeConnect = ({timeFromMount}) =>
    <div className="dark">
        {`TimeConnect -  time from mount ${Math.floor(timeFromMount / second)}sec`}
    </div>;

TimeConnect.propTypes = {
    timeFromMount: PropTypes.number.isRequired
};

const mapContextToProps = context =>
    ({timeFromMount: context.timeFromMount});

export default TimeContext.connect(TimeConnect, mapContextToProps);