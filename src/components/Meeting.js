import React, { Component } from 'react';
import Source from './Source';
import Date from './Date';
import HourAndMinute from './HourAndMinute';

class Meeting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editDate: false
        };
    }

    renderTimeDisplay() {
        if (!this.state.editDate) {
            return (
                <div className="col-12 col-md-6 meeting-time-display">
                    <div className="time-box" onClick={() => { this.setState({editDate: true}); }}>
                        <div className="hour-and-minute">
                            <i className="fa fa-pencil-square-o d-none d-sm-inline-block" aria-hidden="true"></i>
                            { this.props.meetingData.localTime.format('HH:mm') }
                        </div>
                        <div className="date">
                            { this.props.meetingData.localTime.format('ddd DD, MMM YYYY') } <i className="fa fa-pencil-square-o d-sm-none" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="col-12 col-md-6 meeting-time-edit">
                <div className="row">
                    <div className="col-12 col-md-8">
                        <Date 
                            data={this.props.meetingData}
                            changeTime={this.props.changeTime}
                            changeSource={this.props.changeSource}
                            />
                    </div>
                    <div className="col-12 col-md-4">
                        <HourAndMinute 
                            data={this.props.meetingData} 
                            changeHourAndMinute={this.props.changeHourAndMinute}
                            />
                    </div>
                    <div className="col-12 btn-return">
                        <button className="btn btn-sm btn-link" onClick={() => { this.setState({editDate: false}); }}>
                            Apply <i className="fa fa-angle-right" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        var sourceClassNames = ['col-12'];
        const hasSource = this.props.meetingData.source !== null;

        if (hasSource) {
            sourceClassNames.push('col-md-6');
        }

        return (
            <div className="list-group-item Meeting">
                <div className="row" style={{ flex: 1 }}>
                    <div className={sourceClassNames.join(' ')}>
                        <Source 
                            data={this.props.meetingData} 
                            changeSource={this.props.changeSource} 
                            />
                    </div>
                    
                    { hasSource ? this.renderTimeDisplay() : null }
                </div>
            </div>
        );
    }
}

export default Meeting;