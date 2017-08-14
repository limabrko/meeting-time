import React, { Component } from 'react';
import Swipeable from 'react-swipeable';

const MINUTES_TO_PASS = 5;

class HourAndMinute extends Component {
    constructor(props) {
        super(props);

        this.onSwipeLeft = this.onSwipeLeft.bind(this);
        this.onSwipeRight = this.onSwipeRight.bind(this);
        this.state = {
            time: null,
            updatingLocalTime: false
        };
    }

    onSwipeLeft(e, x, y, isFlick, velocity) {
        if (this.state.time.hours() === 0 && this.state.time.minutes() === 0 ) {
            return;
        }

        const minutesMod = this.state.time.minutes() % MINUTES_TO_PASS;
        const minutesToSubtract = minutesMod > 0 ? minutesMod : MINUTES_TO_PASS;
        this.props.changeHourAndMinute('subtract', minutesToSubtract);
    }

    onSwipeRight() {
        if (this.state.time.hours() === 23 && this.state.time.minutes() >= (60 - MINUTES_TO_PASS) ) {
            return;
        }

        const minutesMod = this.state.time.minutes() % MINUTES_TO_PASS;
        const minutesToSubtract = minutesMod > 0 ? (MINUTES_TO_PASS - minutesMod) : MINUTES_TO_PASS;
        this.props.changeHourAndMinute('add', minutesToSubtract);
    }

    componentWillReceiveProps() {
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

        var componentClassNames = ['form-control', 'form-control-lg', 'hour-and-minute'];
        if (this.state.updatingLocalTime) {
            componentClassNames.push('disabled');
        }

        const controlClassNames = {
            subtract: ['fa', 'fa-caret-left', 'subtract-minutes'],
            add: ['fa', 'fa-caret-right', 'add-minutes']
        };

        return (
            <Swipeable
                trackMouse
                onSwipingLeft={this.onSwipeLeft}
                onSwipingRight={this.onSwipeRight}
                >
                <div className={ componentClassNames.join(' ') }>
                    <i className={controlClassNames.subtract.join(' ')} aria-hidden="true"></i>
                    <span className="display" unselectable="on">{ time.format('HH') }:{ time.format('mm') }</span>
                    <i className={controlClassNames.add.join(' ')} aria-hidden="true"></i>
                </div>
            </Swipeable>
        );
    }
}

export default HourAndMinute;