import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMeeting } from '../actions/index';

class AddMeeting extends Component {
  render() {
    return (
        <div className="add-meeting">
          <button className="btn btn-primary" onClick={ this.props.addMeeting }><i className="fa fa-plus" aria-hidden="true"></i></button>
        </div>
    );
  }
}

export default connect(null, { addMeeting })(AddMeeting);
