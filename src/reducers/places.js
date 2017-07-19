import { ADD_PLACE } from '../actions/index';

const initialState = [
    {
        id: 1,
        placeholder: 'Place 1',
        name: '',
        date: '2017/10/20'
    },
    {
        id: 2,
        placeholder: 'Place 2',
        name: ''
    }
];

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_PLACE:
            return state;
        default:
            return state;
    }
}