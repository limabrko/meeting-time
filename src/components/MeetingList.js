import React, { Component } from 'react';
import { connect } from 'react-redux';
import Place from './Place';
import Date from './Date';

class MeetingList extends Component {
    renderPlace(placeData) {
        return (
            <li className="form-inline" key={placeData.id}>
                <div className="form-group">
                    <label htmlFor={`place_${placeData.id}`}>City: </label>
                    <Place data={placeData} />
                </div>
                <div className="form-group">
                    <Date data={placeData}/>
                </div>
            </li>
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

export default connect(mapStateToProps)(MeetingList);