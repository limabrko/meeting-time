import React, { Component } from 'react';
import InputMoment from 'input-moment';
import Utils from '../services/utils';

class TimeDisplay extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.openDatepicker = this.openDatepicker.bind(this);
        this.closeDatepicker = this.closeDatepicker.bind(this);
        this.state = {
            time: null,
            updatingLocalTime: false,
            datepickerShow: false
        };
    }

    closeDatepicker() {
        this.setState({
            time: this.props.data.localTime.clone(),
            datepickerShow: false
        });
    }

    onChange(time) {
        this.setState({ time });
    }

    onSave() {
        this.setState({datepickerShow: false});
        this.props.changeTime(this.props.data, this.state.time);
    }

    openDatepicker() {
        if (this.state.datepickerShow) {
            return null;
        }

        this.setState({
            datepickerShow: true
        });
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
            <div className="calendar">
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
        const { localTime, source } = this.props.data;
        const time = this.state.time;

        if (!localTime) {
            return null;
        }

        const hasDstOffset = source.timezone.dstOffset !== 0;

        var componentClassNames = ['time-display'];
        if (this.state.updatingLocalTime) {
            componentClassNames.push('disabled');
        }

        return (
            <div className={ componentClassNames.join(' ') } onClick={this.openDatepicker}>
                <div className="box">
                    <div className="time">
                        { hasDstOffset ? <i className="fa fa-sun-o" aria-hidden="true"></i> : null }
                        <span className="hour-and-minute">{ time.format('HH') }:{ time.format('mm') }</span>
                    </div>

                    <div className="date">
                        { time.format('ddd DD, MMM YYYY') }
                    </div>
                </div>

                {/* <div className="box-config">
                    <button className="btn btn-link btn-sm">
                        <i className="fa fa-cog" aria-hidden="true"></i>
                    </button>
                </div> */}

                { this.renderCalendar() }
            </div>
        );
    }
}

export default TimeDisplay;