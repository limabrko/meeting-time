import { ADD_MEETING, CHANGE_PLACE, CHANGE_DATE } from '../actions/index';
import moment from 'moment';

const Date = moment();
const initialState = [
    {
        id: 1,
        placeholder: 'Type the city 1',
        place: null,
        date: Date,
        dateMoment: Date
    },
    {
        id: 2,
        placeholder: 'Type the city 2',
        place: null,
        date: Date,
        dateMoment: Date
    }
];

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_MEETING:
            return state;
        case CHANGE_PLACE:
            var meetings = state.map(function(meeting){
                if (meeting.id === action.payload.id) {
                    meeting.place = action.payload.place;
                }

                return meeting;
            });
            
            return meetings;
        case CHANGE_DATE:
            return state;
        default:
            return state;
    }
}