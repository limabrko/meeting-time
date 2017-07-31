/* global google */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePlace } from '../actions/index';

class Place extends Component {
    constructor(props) {
        super(props);

        this.verifyPlace = this.verifyPlace.bind(this);
        this.state = {place: null};
    }

    componentDidMount() {
        const self = this;
        const autocomplete = new google.maps.places.Autocomplete(this.textInput);

        autocomplete.addListener('place_changed', function () {
            const { id } = self.props.data;
            const place = autocomplete.getPlace();

            self.setState({place});
            self.props.changePlace(id, place);
        });
    }

    verifyPlace() {
        this.textInput.value = this.state.place ? this.state.place.formatted_address : '';
    }

    onPlaceFocus(event) {
        event.target.select();
    }

    render() {
        const { id, placeholder } = this.props.data;

        return (
            <input
                ref={(input) => { this.textInput = input; }}
                id={`place_${id}`}
                placeholder={placeholder}
                className="form-control"
                type="text"
                //value={name}
                //onChange={this.onInputChange}
                onBlur={this.verifyPlace}
                onFocus={this.onPlaceFocus}
            />
        );
    }
}

export default connect(null, { changePlace })(Place);