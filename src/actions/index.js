import axios from 'axios';

export const ADD_MEETING = 'ADD_MEETING';
export const CHANGE_PLACE = 'CHANGE_PLACE';
export const CHANGE_TIME = 'CHANGE_TIME';
export const CHANGE_TIMEZONE = 'CHANGE_TIMEZONE';

const TIMEZONE_API_KEY = 'AIzaSyByEkLOsB5e9YhmsfO9sGkEmw5UcPyxMOQ';
const TIMEZONE_API_URL = 'https://maps.googleapis.com/maps/api/timezone/json';

export function addMeeting() {
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

export function changeTimezone(oldMeeting, place) {
    const url = `${TIMEZONE_API_URL}?key=${TIMEZONE_API_KEY}&location=${place.geometry.location.lat()},${place.geometry.location.lng()}&timestamp=${oldMeeting.time.unix()}`;

    return (dispatch) => {
        axios.get(url)
            .then((response) => {
                const timezone = response.data;

                dispatch({
                    type: CHANGE_TIMEZONE,
                    payload: { id: oldMeeting.id, timezone }
                });
            });
    };
}