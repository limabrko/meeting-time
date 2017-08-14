import React, { Component } from 'react';
import InputMoment from 'input-moment';
import Utils from '../services/utils';
import DatePicker from 'react-datepicker';

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

    onChange(time) {
        time.hours(this.state.time.hours()).minutes(this.state.time.minutes());
        this.setState({ time });
        this.props.changeTime(this.props.data, time);
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

    renderCalendar() { 
        if (!this.state.datepickerShow) {
            return null;
        }

        return (
            <div className="form-control">
                <div className="overlay" onClick={this.closeDatepicker}></div>
                <div 
                    ref={(element) => { this.calendarContent = element; }}
                    className="content">
                    <InputMoment
                        moment={this.state.time}
                        onChange={this.onChange}
                        onSave={this.onSave}
                        prevMonthIcon="ion-ios-arrow-left"
                        nextMonthIcon="ion-ios-arrow-right"
                    />
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        if (this.calendarContent) {
            const windowHeight = window.innerHeight;
            const calendarHeight = this.calendarContent.clientHeight;
            const calendarMarginTop = (windowHeight - calendarHeight) / 2;
            this.calendarContent.style.marginTop = `${calendarMarginTop}px`;
        }
    }

    render() {
        const { localTime } = this.props.data;
        const time = this.state.time;

        if (!localTime) {
            return null;
        }

        var componentClassNames = ['form-control', 'form-control-lg', 'date'];
        if (this.state.updatingLocalTime) {
            componentClassNames.push('disabled');
        }

        return (
            <DatePicker
                customInput={
                    <div>
                        { time.format('ddd DD, MMM YYYY') }
                    </div>
                }
                selected={this.state.time}
                onChange={this.onChange}
                className={ componentClassNames.join(' ') }
                />
        );
    }
}

export default Date;