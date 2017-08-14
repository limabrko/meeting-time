import axios from 'axios';
import { PLACE, TIMEZONE } from '../components/Source';

export const ADD_MEETING = 'ADD_MEETING';
export const CHANGE_SOURCE = 'CHANGE_SOURCE';
export const CHANGE_TIME = 'CHANGE_TIME';
export const CHANGE_HOUR_AND_MINUTE = 'CHANGE_HOUR_AND_MINUTE';

const TIMEZONE_API_KEY = 'AIzaSyByEkLOsB5e9YhmsfO9sGkEmw5UcPyxMOQ';
const TIMEZONE_API_URL = 'https://maps.googleapis.com/maps/api/timezone/json';

export function addMeeting() {
    return {
        type: ADD_MEETING
    };
}

export function changeSource(oldMeeting, source) {
    switch(source.type) {
        case PLACE:
            // It is required to get the timezone to calculate a local time of that place
            const url = `${TIMEZONE_API_URL}?key=${TIMEZONE_API_KEY}&location=${source.original.geometry.location.lat()},${source.original.geometry.location.lng()}&timestamp=${oldMeeting.time.unix()}`;

            return (dispatch) => {
                axios.get(url)
                    .then((response) => {
                        source.timezone = response.data;

                        dispatch({
                            type: CHANGE_SOURCE,
                            payload: { id: oldMeeting.id, source }
                        });
                    });
            };
        case TIMEZONE:
            source.timezone = {
                rawOffset: source.original.rawOffset,
                dstOffset: source.original.dstOffset
            };
            return {
                type: CHANGE_SOURCE,
                payload: { id: oldMeeting.id, source }
            };
        default:
            return {
                type: CHANGE_SOURCE,
                payload: { id: oldMeeting.id, source }
            };
    }
}

export function changeTime(oldMeeting, time) {
    var source = oldMeeting.source;

    switch(source.type) {
        case PLACE:
        // It is required to get the timezone to calculate a local time of that place
        const url = `${TIMEZONE_API_URL}?key=${TIMEZONE_API_KEY}&location=${source.original.geometry.location.lat()},${source.original.geometry.location.lng()}&timestamp=${time.unix()}`;

        return (dispatch) => {
            axios.get(url)
                .then((response) => {
                    source.timezone = response.data;

                    dispatch({
                        type: CHANGE_TIME,
                        payload: { id: oldMeeting.id, source, time }
                    });
                });
        };
        default:
            return {
                type: CHANGE_TIME,
                payload: { id: oldMeeting.id, source, time }
            };
    }
}

export function changeHourAndMinute(type, minutes) {
    return {
        type: CHANGE_HOUR_AND_MINUTE,
        payload: { type, minutes }
    };
}