import React, { Component } from 'react';
import Place from './Place';
import Date from './Date';

class Meeting extends Component {
    render() {
        return (
            <li className="form-inline">
                <div className="form-group">
                    <Place data={this.props.meetingData} changePlace={this.props.changePlace} />
                </div>
                <div className="form-group">
                    <Date 
                        data={this.props.meetingData} 
                        changeTime={this.props.changeTime}
                        changeTimezone={this.props.changeTimezone}
                        />
                </div>
            </li>
        );
    }
}

export default Meeting;