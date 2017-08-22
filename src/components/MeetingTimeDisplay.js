import React, { Component } from 'react';

class MeetingTimeDisplay extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var componentClassNames = ['MeetingTimeDisplay', 'col-12', 'col-md-6'],
            titleWorktime = "This time is out of worktime";

        if (this.props.meetingData.isWorktime) {
            componentClassNames.push('worktime');
            titleWorktime = "This time is on worktime";
        }

        return (
            <div className={componentClassNames.join(' ')}>
                <div className="time-box" onClick={this.props.onClick}>
                    <div className="hour-and-minute" title={titleWorktime}>
                        <span className="worktime-display"></span>
                        { this.props.meetingData.localTime.format('HH:mm') }
                    </div>
                    <div className="date">
                        <i className="fa fa-pencil-square-o d-none d-sm-inline-block" aria-hidden="true"></i> { this.props.meetingData.localTime.format('ddd DD, MMM YYYY') } <i className="fa fa-pencil-square-o d-sm-none" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        );
    }
}

export default MeetingTimeDisplay;