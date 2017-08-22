import React, { Component } from 'react';
import Source from './Source';
import Date from './Date';
import HourAndMinute from './HourAndMinute';
import MeetingTimeDisplay from './MeetingTimeDisplay';

class Meeting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editDate: false
        };
    }

    renderWorktime() {
        if (this.props.meetingData.isWorktime) {
            return null;
        }

        return (
            <div className="col-12 worktime-box">
                <div className="alert alert-danger">
                    { `This time is out of working time` }
                </div>
            </div>
        );
    }

    renderTimeDisplay() {
        if (!this.state.editDate) {
            return <MeetingTimeDisplay 
                        meetingData={this.props.meetingData}
                        onClick={() => { this.setState({editDate: true}); }} 
                        />;
        }

        return (
            <div className="col-12 col-md-6 meeting-time-edit">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <Date 
                            data={this.props.meetingData}
                            changeTime={this.props.changeTime}
                            changeSource={this.props.changeSource}
                            />
                    </div>
                    <div className="col-12 col-md-6">
                        <HourAndMinute 
                            data={this.props.meetingData} 
                            changeHourAndMinute={this.props.changeHourAndMinute}
                            />
                    </div>
                    { this.renderWorktime() }
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