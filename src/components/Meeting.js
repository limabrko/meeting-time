import React, { Component } from 'react';
import Source from './Source';
import TimeDisplay from './TimeDisplay';

class Meeting extends Component {
    renderTimeDisplay() {
        return (
            <div className="col-12 col-md-6">
                <TimeDisplay 
                    data={this.props.meetingData} 
                    changeTime={this.props.changeTime}
                    changeSource={this.props.changeSource}
                    />
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
            <div className="list-group-item p-3">
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