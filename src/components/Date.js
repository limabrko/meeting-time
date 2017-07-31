import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeDate } from '../actions/index';
import InputMoment from 'input-moment';

class Date extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = {
            dateFormatted: 'date formatted', 
            datepickerShow: false
        };
    }

    onChange(event) {
        console.log(event);
    }

    onSave(event) {
        this.setState({datepickerShow: false});
    }

    onClick(event) {
        console.log(event);
        this.setState({datepickerShow: true});
    }

    renderInputMoment() {
        const { dateMoment } = this.props.data;

        if (!this.state.datepickerShow) {
            return '';
        }

        return <InputMoment
                    moment={dateMoment}
                    onChange={this.onChange}
                    onSave={this.onSave}
                    prevMonthIcon="ion-ios-arrow-left" // default
                    nextMonthIcon="ion-ios-arrow-right" // default
                    />;
    }

    render() {
        return (
            <div>
                <input 
                    className="form-control" 
                    value={this.state.dateFormatted} 
                    onClick={this.onClick}
                    readOnly/>

                { this.renderInputMoment() }
            </div>
        );
    }
}

export default connect(null, { changeDate })(Date);