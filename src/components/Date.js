import React, { Component } from 'react';
import { changeDate } from '../actions/index';
import InputMoment from 'input-moment';

class Date extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = {
            date: null,
            datepickerShow: false
        };
    }

    onChange(dateMoment) {
        this.setState({ date: dateMoment });
    }

    onSave(event) {
        this.setState({datepickerShow: false});
    }

    onClick(event) {
        this.setState({
            date: this.props.data.dateMoment,
            datepickerShow: true
        });
    }

    renderCalendar() {
        if (!this.state.datepickerShow) {
            return '';
        }

        return <InputMoment
                    moment={this.state.date}
                    onChange={this.onChange}
                    onSave={this.onSave}
                    prevMonthIcon="ion-ios-arrow-left" // default
                    nextMonthIcon="ion-ios-arrow-right" // default
                    />;
    }

    render() {
        if (!this.props.data.place) {
            return null;
        }

        const dateFormatted = this.props.data.date.format();

        return (
            <div>
                <input 
                    type="text"
                    className="form-control" 
                    value={dateFormatted} 
                    onClick={this.onClick}
                    readOnly/>

                { this.renderCalendar() }
            </div>
        );
    }
}

export default Date;