export const ADD_MEETING = 'ADD_MEETING';
export const CHANGE_PLACE = 'CHANGE_PLACE';
export const CHANGE_DATE = 'CHANGE_DATE';

export function addPlace() {
    return {
        type: ADD_MEETING
    };
}

export function changePlace(id, place) {
    return {
        type: CHANGE_PLACE,
        payload: { id, place }
    };
}

export function changeDate(id, date) {
    return {
        type: CHANGE_DATE,
        payload: { id, date }
    };
}