import React, { Component } from 'react';

class Place extends Component {
    constructor(props) {
        super(props);

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(event) {
        console.log(event);
    }

    render() {
        const { id, name, date, placeholder } = this.props.data;

        return (
            <li className="form-inline">
                <div className="form-group">
                    <label htmlFor={`place_${id}`}>City: </label>
                    <input
                        id={`place_${id}`}
                        placeholder={placeholder}
                        className="form-control"
                        type="text"
                        value={name}
                        onChange={this.onInputChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        value={date}
                    />
                </div>
            </li>
        );
    }
}

export default Place;