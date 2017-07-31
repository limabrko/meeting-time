import React, { Component } from 'react';
import Place from './Place';
import Date from './Date';

class Meeting extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <li className="form-inline">
                <div className="form-group">
                    <Place data={this.props.meetingData} changePlace={this.props.changePlace} />
                </div>
                <div className="form-group">
                    <Date data={this.props.meetingData} changeDate={this.props.changeDate}/>
                </div>
            </li>
        );
    }
}

export default Meeting;