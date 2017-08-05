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
            updatingLocalTime: false,
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
        if (nextProps.data.timezoneOutdated && 
            nextProps.data.source &&
            !this.state.updatingLocalTime) {
            this.setState({ updatingLocalTime: true });
            nextProps.changeSource(nextProps.data, nextProps.data.source);
            return;
        }

        this.setState({ updatingLocalTime: false });
    }

    render() {
        const { localTime } = this.props.data;

        if (!localTime) {
            return null;
        }

        const disabledInput = this.state.updatingLocalTime;

        return (
            <div>
                <div className="form-group">
                    { localTime.format('L') }
                </div>
                <div className="form-group">
                    { localTime.format('HH') }:{ localTime.format('mm') }
                </div>

                { this.renderCalendar() }
            </div>
        );
    }
}

export default Date;