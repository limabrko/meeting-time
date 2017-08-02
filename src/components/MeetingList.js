import React, { Component } from 'react';
import { connect } from 'react-redux';
import Meeting from './Meeting';
import { changePlace, changeTime, changeTimezone } from '../actions/index';

class MeetingList extends Component {
    renderMeeting(meetingData) {
        return <Meeting 
                    key={meetingData.id} 
                    meetingData={meetingData} 
                    changePlace={this.props.changePlace} 
                    changeTime={this.props.changeTime} 
                    changeTimezone={this.props.changeTimezone} 
                    />;
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.meetings.map(this.renderMeeting.bind(this))}
                </ul>
            </div>
        );
    }
}

function mapStateToProps({ meetings }) {
    return { meetings };
}

export default connect(mapStateToProps, { changePlace, changeTime, changeTimezone })(MeetingList);