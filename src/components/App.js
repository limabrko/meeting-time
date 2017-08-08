import React, { Component } from 'react';

//Components
import MeetingList from './MeetingList';
import AddMeeting from './AddMeeting';

// Styles
import '../Vendors.css';
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="container">
          <h1 className="app-title">Find the best meeting time</h1>
          <MeetingList />
          <AddMeeting />
        </div>
      </div>
    );
  }
}

export default App;
