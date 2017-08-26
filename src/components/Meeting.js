import React, { Component } from 'react';
import Source from './Source';
import Date from './Date';
import HourAndMinute from './HourAndMinute';
import MeetingTimeDisplay from './MeetingTimeDisplay';
import WorktimeAlert from './WorktimeAlert';
import WorktimeConfig from './WorktimeConfig';

class Meeting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editDate: false,
            editWorktime: false
        };
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
                    <div className="col-12 worktime-box">
                        <WorktimeAlert data={this.props.meetingData}/>
                        <WorktimeConfig data={this.props.meetingData} changeWorktime={this.props.changeWorktime} show={this.state.editWorktime}/>
                    </div>
                    <div className="col-12 actions-box">
                        <button className="btn btn-sm btn-info" onClick={() => { this.setState({editWorktime: !this.state.editWorktime}); }}>
                            <i className="fa fa-cog" aria-hidden="true"></i> Change worktime
                        </button>

                        <button className="btn btn-sm btn-success" onClick={() => { this.setState({editDate: false, editWorktime: false}); }}>
                            <i className="fa fa-check" aria-hidden="true"></i> Apply
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