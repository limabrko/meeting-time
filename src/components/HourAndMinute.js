import React, { Component } from 'react';

class HourAndMinute extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.state = {
            time: null,
            updatingLocalTime: false
        };
    }

    onChange(e) {
        const radix = 10;
        const inputTime = e.target.value.split(':');
        var newTime = this.state.time.clone();
        newTime.hours(parseInt(inputTime[0], radix)).minutes(parseInt(inputTime[1], radix));

        const diff = newTime.diff(this.state.time);
        const type = diff < 0 ? 'subtract' : 'add';

        if (diff !== 0) {
            this.props.changeHourAndMinute(type, Math.abs(diff / 60 / 1000));
        }
    }

    componentWillReceiveProps() {
        this.setState({
            time: this.props.data.localTime.clone(),
            updatingLocalTime: false 
        });
    }

    componentWillMount() {
        this.setState({
            time: this.props.data.localTime.clone()
        });
    }

    render() {
        const { localTime } = this.props.data;
        const time = this.state.time;

        if (!localTime) {
            return null;
        }

        var componentClassNames = ['form-control', 'form-control-lg', 'hour-and-minute'];
        if (this.state.updatingLocalTime) {
            componentClassNames.push('disabled');
        }

        return (
            <input 
                type="time" 
                className={ componentClassNames.join(' ') } 
                onChange={this.onChange} 
                value={time.format('HH:mm')}
                required
                />
        );
    }
}

export default HourAndMinute;