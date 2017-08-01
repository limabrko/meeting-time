/* global google */
import React, { Component } from 'react';

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
            const place = autocomplete.getPlace();

            self.setState({place});
            self.props.changePlace(self.props.data, place);
        });
    }

    verifyPlace() {
        this.textInput.value = this.state.place ? this.state.place.formatted_address : '';
    }

    onPlaceFocus(event) {
        event.target.select();
    }

    render() {
        const { placeholder } = this.props.data;

        return (
            <input
                ref={(input) => { this.textInput = input; }}
                placeholder={placeholder}
                className="form-control"
                type="text"
                onBlur={this.verifyPlace}
                onFocus={this.onPlaceFocus}
            />
        );
    }
}

export default Place;