import axios from 'axios';

export const ADD_MEETING = 'ADD_MEETING';
export const CHANGE_PLACE = 'CHANGE_PLACE';
export const CHANGE_TIME = 'CHANGE_TIME';

const TIMEZONE_API_KEY = 'AIzaSyDyMhR-POhJgql5zGKm-XFGIZU7yJvv8KI';
const TIMEZONE_API_URL = 'https://maps.googleapis.com/maps/api/timezone/json';

export function addPlace() {
    return {
        type: ADD_MEETING
    };
}

export function changePlace(oldMeeting, place) {
    // It is required to get the timezone to calculate a local time of that place
    const url = `${TIMEZONE_API_URL}?key=${TIMEZONE_API_KEY}&location=${place.geometry.location.lat()},${place.geometry.location.lng()}&timestamp=${oldMeeting.time.unix()}`;

    return (dispatch) => {
        axios.get(url)
            .then((response) => {
                const timezone = response.data;

                dispatch({
                    type: CHANGE_PLACE,
                    payload: { id: oldMeeting.id, place, timezone }
                });
            });
    };
}

export function changeTime(oldMeeting, time) {
    return {
        type: CHANGE_TIME,
        payload: { id: oldMeeting.id, time }
    };
}