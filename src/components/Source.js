/* global google */
import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import TimezonesService from '../services/timezones';

export const PLACE = 'place';
export const TIMEZONE = 'timezone';
const AUTOCOMPLETE_LIMIT_SUGGESTION_PLACES = 5;
const AUTOCOMPLETE_LIMIT_SUGGESTION_TIMEZONES = 5;
const AUTOCOMPLETE_MIN_CHARS = 3;

class Source extends Component {
    constructor(props) {
        super(props);

        this.onSourceChange = this.onSourceChange.bind(this);
        this.onSourceSelect = this.onSourceSelect.bind(this);
        this.onSourceBlur = this.onSourceBlur.bind(this);
        this.state = {
            value: '',
            suggestions: [],
            lastSource: null
        };
    }

    replacePlacesInSuggestions(newPlaces) {
        const suggestionsWithoutPlaces = this.state.suggestions.filter((suggestion) => {
            return suggestion.type !== PLACE;
        });

        const limitedNewPlaces = newPlaces.slice(0, AUTOCOMPLETE_LIMIT_SUGGESTION_PLACES);
        const suggestions = [...limitedNewPlaces, ...suggestionsWithoutPlaces];
        this.setState({suggestions});
    }

    replaceTimezonesInSuggestions(newTimezones) {
        const suggestionsWithoutTimezones = this.state.suggestions.filter((suggestion) => {
            return suggestion.type !== TIMEZONE;
        });

        const limitedNewTimezones = newTimezones.slice(0, AUTOCOMPLETE_LIMIT_SUGGESTION_TIMEZONES);
        const suggestions = [...suggestionsWithoutTimezones, ...limitedNewTimezones];
        this.setState({suggestions});
    }

    selectPlace(suggestion) {
        const self = this;
        const request = {
            placeId: suggestion.original.place_id
        };

        // Init Google Places Service (require a HTMLElement as parameter)
        // Request the place details to get the lat and lng of a place
        const service = new google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails(request, (response) => {
            suggestion.original = response;
            self.props.changeSource(self.props.data, suggestion);
            self.setState({ 
                value: suggestion.original.formatted_address,
                lastSource: suggestion
            });
        });
    }

    selectTimezone(suggestion) {
        this.setState({ 
                value: suggestion.description,
                lastSource: suggestion
            });
        this.props.changeSource(this.props.data, suggestion);
    }

    matchTimezones(value) {
        const self = this;
        TimezonesService.getTimezones(value)
            .then((predictions) => {
                const timezoneSuggestions = predictions.map((prediction) => {
                    const suggestion = {
                        original: prediction,
                        description: `${prediction.name} - ${prediction.abbr}`,
                        name: prediction.name,
                        details: prediction.abbr,
                        type: TIMEZONE
                    };
                    return suggestion;
                });
                self.replaceTimezonesInSuggestions(timezoneSuggestions);
            });
    }

    matchGoogleAutocompletePlaces(value) {
        const self = this;
        const GoogleAutocompleteService = new google.maps.places.AutocompleteService();
        GoogleAutocompleteService.getPlacePredictions({ input: value }, (predictions, status) => {
            if (!predictions) {
                predictions = [];
            }

            const placeSuggestions = predictions.map((prediction) => {
                var details = prediction.structured_formatting.secondary_text;
                if (!details && prediction.types.indexOf('country') > -1) {
                    details = 'Country';
                }

                const suggestion = {
                    original: prediction,
                    description: `${prediction.structured_formatting.main_text} - ${prediction.structured_formatting.secondary_text}`,
                    name: prediction.structured_formatting.main_text,
                    details,
                    type: PLACE
                };
                return suggestion;
            });
            self.replacePlacesInSuggestions(placeSuggestions);
        });
    }

    onSourceChange(event) {
        const value = event.target.value;
        this.setState({ value });

        if (value.length < AUTOCOMPLETE_MIN_CHARS) {
            this.setState({ suggestions: [] });
            return;
        }

        this.matchGoogleAutocompletePlaces(value);
        this.matchTimezones(value);
    }

    onSourceBlur() {
        this.setState({ value: (this.state.lastSource ? this.state.lastSource.description : '') });
    }

    onSourceSelect(value, item) {
        switch (item.type) {
            case PLACE:
                this.selectPlace(item);
                break;
            case TIMEZONE:
                this.selectTimezone(item);
                break;
            default:
                alert('Source unknown');
        }
    }

    onSourceFocus(event) {
        event.target.select();
    }

    render() {
        const { placeholder } = this.props.data;
        var inputClassNames = [
            'source-control',
            'form-control',
            'form-control-lg'
        ];

        if (this.state.lastSource && 
            (this.state.lastSource.description === this.state.value)) {
            inputClassNames.push('idle');
        }

        return (
            <Autocomplete
                getItemValue={(item) => item.description}
                items={this.state.suggestions}
                renderItem={(item, isHighlighted) =>
                    <div className={ isHighlighted ? 'autocomplete-item highlighted' : 'autocomplete-item' }>
                        {item.name}
                        <div><small>{item.details}</small></div>
                    </div>
                }
                inputProps={{
                    className: inputClassNames.join(' '),
                    placeholder,
                    onBlur: this.onSourceBlur,
                    onFocus: this.onSourceFocus
                }}
                renderMenu={(items, value, style) => { 
                    return (<div className="autocomplete" children={items}/>)
                }}
                wrapperProps={{
                    className: 'autocomplete-wrap'
                }}
                wrapperStyle={{}}
                value={this.state.value}
                onChange={this.onSourceChange}
                onSelect={this.onSourceSelect}
                />
        );
    }
}

export default Source;