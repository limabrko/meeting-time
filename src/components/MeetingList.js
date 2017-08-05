import React, { Component } from 'react';
import { connect } from 'react-redux';
import Meeting from './Meeting';
import { changeSource, changeTime } from '../actions/index';

class MeetingList extends Component {
    renderMeeting(meetingData) {
        return <Meeting 
                    key={meetingData.id} 
                    meetingData={meetingData} 
                    changeSource={this.props.changeSource} 
                    changeTime={this.props.changeTime} 
                    />;
    }

    render() {
        return (
            <div className="meeting">
                <div className="list-group">
                    {this.props.meetings.map(this.renderMeeting.bind(this))}
                </div>
            </div>
        );
    }
}

function mapStateToProps({ meetings }) {
    return { meetings };
}

export default connect(mapStateToProps, { changeSource, changeTime })(MeetingList);