import React, { Component } from 'react';

//Components
import MeetingList from './MeetingList';
import AddMeeting from './AddMeeting';

// Styles
import '../Vendors.scss';
import '../App.scss';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="container">
                    <h1 className="app-title">Find the best meeting time</h1>
                    <MeetingList />
                    <AddMeeting />

                    <footer>
                        Made by <a href="https://www.linkedin.com/in/aboutfelipelima/">Felipe Lima</a> | <a href="https://github.com/lima-space/meeting-time">Github</a>
                    </footer>
                </div>
            </div>
        );
    }
}

export default App;
