import React, { Component } from 'react';
import { formatMinutesToHour, convertHHmmToMinutes } from '../services/utils';

class WorktimeConfig extends Component {
    constructor(props) {
        super(props);

        this.onStartWorktimeChange = this.onStartWorktimeChange.bind(this);
        this.onEndWorktimeChange = this.onEndWorktimeChange.bind(this);
        this.onWeekendChange = this.onWeekendChange.bind(this);
    }

    onStartWorktimeChange(event) {
        this.props.changeWorktime(this.props.data.id, 'startWorktime', convertHHmmToMinutes(event.target.value));
    }

    onEndWorktimeChange(event) {
        this.props.changeWorktime(this.props.data.id, 'endWorktime', convertHHmmToMinutes(event.target.value));
    }

    onWeekendChange(event) {
        this.props.changeWeekendWorktime(this.props.data.id, event.target.checked);
    }

    render() {
        const { startWorktime, endWorktime, workOnWeekend } = this.props.data;
        
        if (!this.props.show) {
            return null;
        }
    
        return (
            <div className="row WorktimeConfig">
                <div className="col-12 col-sm-6">
                    <label>Start Worktime</label>
                    <input 
                        type="time" 
                        className="form-control"
                        onChange={this.onStartWorktimeChange} 
                        value={formatMinutesToHour(startWorktime)}
                        required
                        />
                </div>
                <div className="col-12 col-sm-6">
                    <label>End Worktime</label>
                    <input 
                        type="time" 
                        className="form-control"
                        onChange={this.onEndWorktimeChange} 
                        value={formatMinutesToHour(endWorktime)}
                        required
                        />
                </div>
                <div className="col-12 weekend-config">
                    <div className="form-check">
                        <label className="form-check-label" htmlFor="weekend_config_switch">
                        <input
                            type="checkbox"
                            id="weekend_config_switch"
                            className="form-check-input"
                            onChange={this.onWeekendChange}
                            checked={workOnWeekend}
                            /> Work on weekend
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

export default WorktimeConfig;