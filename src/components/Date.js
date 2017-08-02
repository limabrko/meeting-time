import React, { Component } from 'react';
import InputMoment from 'input-moment';

class Date extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = {
            time: null,
            updatingTime: false,
            datepickerShow: false
        };
    }

    onChange(time) {
        this.setState({ time });
    }

    onSave() {
        this.setState({datepickerShow: false});
        this.props.changeTime(this.props.data, this.state.time);
    }

    onClick(event) {
        this.setState({
            time: this.props.data.localTime,
            datepickerShow: true
        });
    }

    renderCalendar() { 
        if (!this.state.datepickerShow) {
            return null;
        }

        return <InputMoment
                    moment={this.state.time}
                    onChange={this.onChange}
                    onSave={this.onSave}
                    prevMonthIcon="ion-ios-arrow-left" // default
                    nextMonthIcon="ion-ios-arrow-right" // default
                    />;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.timezoneOutdated && !this.state.updatingTime) {
            this.setState({ updatingTime: true });
            nextProps.changeTimezone(nextProps.data, nextProps.data.place);
            return;
        }

        this.setState({ updatingTime: false });
    }

    render() {
        const { place, localTime } = this.props.data;

        if (!place) {
            return null;
        }

        const disabledInput = this.state.updatingTime;
        const timeFormatted = localTime.format();

        return (
            <div>
                <input 
                    type="text"
                    className="form-control input-lg" 
                    value={timeFormatted} 
                    onClick={this.onClick}
                    disabled={disabledInput}
                    readOnly/>
                <span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>

                { this.renderCalendar() }
            </div>
        );
    }
}

export default Date;