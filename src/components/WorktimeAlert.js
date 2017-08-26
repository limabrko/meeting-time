import React from 'react';
import { formatMinutesToHour } from '../services/utils';

const WorktimeAlert = (props) => {
    const { isWorktime, startWorktime, endWorktime } = props.data;

    if (isWorktime) {
        return null;
    }

    return (
        <div className="alert alert-danger">
            { `This time is out of working time (${formatMinutesToHour(startWorktime)} ~ ${formatMinutesToHour(endWorktime)})` }
        </div>
    );
}

export default WorktimeAlert;