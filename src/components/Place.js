/* global google */
import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';

class Place extends Component {
    constructor(props) {
        super(props);

        this.onPlaceChange = this.onPlaceChange.bind(this);
        this.onPlaceSelect = this.onPlaceSelect.bind(this);
        this.verifyPlace = this.verifyPlace.bind(this);
        this.state = {
            value: '',
            suggestions: [],
            place: null
        };
    }

    verifyPlace() {
        this.setState({ value: (this.state.place ? this.state.place.formatted_address : '') });
    }

    onPlaceChange(event) {
        const self = this;
        const value = event.target.value;

        // Load suggestions to autocomplete
        const service = new google.maps.places.AutocompleteService();
        service.getPlacePredictions({ input: value }, function(predictions, status) {
            self.setState({suggestions: predictions});
        });
        this.setState({ value });
    }

    onPlaceSelect(value, item) {
        const self = this;
        const request = {
            placeId: item.place_id
        };

        // Google Places Service require a HTMLElement as parameter
        const service = new google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails(request, (response) => {
            self.props.changePlace(self.props.data, response);
            this.setState({ 
                value: response.formatted_address,
                place: response
            });
        });
    }

    onPlaceFocus(event) {
        event.target.select();
    }

    render() {
        const { placeholder } = this.props.data;

        return (
            <div>
                <Autocomplete
                    getItemValue={(item) => item.description}
                    items={this.state.suggestions}
                    renderItem={(item, isHighlighted) =>
                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                            {item.description}
                        </div>
                    }
                    inputProps={{
                        className: "form-control",
                        placeholder,
                        onBlur: this.verifyPlace
                    }}
                    value={this.state.value}
                    onChange={this.onPlaceChange}
                    onSelect={this.onPlaceSelect}
                    />
            </div>
        );
    }
}

export default Place;