import React, { Component } from 'react';
import { connect } from 'react-redux';
import Place from './Place';

class PlacesList extends Component {
    constructor(props) {
        super(props);

        this.state = { term: "" };
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(event) {
        console.log(event.target.value);
    }

    renderPlace(placeData) {
        return (
            <Place key={placeData.id} data={placeData} />
        );
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.places.map(this.renderPlace)}
                </ul>
            </div>
        );
    }
}

function mapStateToProps({ places }) {
    return { places };
}

export default connect(mapStateToProps)(PlacesList);