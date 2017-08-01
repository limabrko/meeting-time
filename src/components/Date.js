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

    render() {
        if (!this.props.data.place) {
            return null;
        }

        const timeFormatted = this.props.data.localTime.format();

        return (
            <div>
                <input 
                    type="text"
                    className="form-control" 
                    value={timeFormatted} 
                    onClick={this.onClick}
                    readOnly/>

                { this.renderCalendar() }
            </div>
        );
    }
}

export default Date;