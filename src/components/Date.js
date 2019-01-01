import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class Date extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.state = {
            time: null,
            updatingLocalTime: false
        };
    }

    onChange(selectedDate) {
        var newDate = moment(selectedDate);
        newDate.hours(this.state.time.hours()).minutes(this.state.time.minutes());
        this.setState({ time: newDate });
        this.props.changeTime(this.props.data, newDate);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.timezoneOutdated && 
            nextProps.data.source &&
            !this.state.updatingLocalTime) {

            this.setState({ updatingLocalTime: true });
            nextProps.changeSource(nextProps.data, nextProps.data.source);
            return;

        }

        this.setState({
            time: this.props.data.localTime.clone(),
            updatingLocalTime: false 
        });
    }

    componentWillMount() {
        this.setState({ time: this.props.data.localTime.clone() });
    }

    render() {
        const { localTime } = this.props.data;
        const time = this.state.time;

        if (!localTime) {
            return null;
        }

        var componentClassNames = ['form-control', 'form-control-lg', 'Date'];
        if (this.state.updatingLocalTime) {
            componentClassNames.push('disabled');
        }

        return (
            <div>
                <label>Date</label>
                <DatePicker
                    customInput={
                        <div>
                            { time.format('ddd DD, MMM YYYY') }
                        </div>
                    }
                    selected={this.state.time.toDate()}
                    onChange={this.onChange}
                    className={ componentClassNames.join(' ') }
                    />
            </div>
        );
    }
}

export default Date;