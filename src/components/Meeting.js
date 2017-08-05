import React, { Component } from 'react';
import Source from './Source';
import Date from './Date';

class Meeting extends Component {
    renderDate() {
        if (!this.props.meetingData.timezone) {
            return null;
        }

        return (
            <div className="form-group">
                    <Date 
                        data={this.props.meetingData} 
                        changeTime={this.props.changeTime}
                        changeSource={this.props.changeSource}
                        />
            </div>
        );
    }

    render() {
        return (
            <div className="list-group-item p-3">
                <div className="form-group">
                    <Source 
                        data={this.props.meetingData} 
                        changeSource={this.props.changeSource} 
                        />
                </div>
                { this.renderDate() }
            </div>
        );
    }
}

export default Meeting;