import { ADD_MEETING, CHANGE_PLACE, CHANGE_TIME } from '../actions/index';
import moment from 'moment';

const initialTime = moment();
const initialMeetings = [
    {
        id: 1,
        placeholder: 'Type the city 1',
        place: null,
        time: initialTime,
        timezone: null,
        localTime: null
    },
    {
        id: 2,
        placeholder: 'Type the city 2',
        place: null,
        time: initialTime,
        timezone: null,
        localTime: null
    }
];

/**
 * Calculate the intial time for meeting based on first place inserted
 * @param {array} meetings 
 */
function setInitialTimeOnMeetings(meetings) {
    const currentTime = moment();
    const meetingsLen = meetings.length;
    const meetingWithPlace = meetings.find((meeting) => { return meeting.place !== null; });

    const utcTime = currentTime.clone();
    utcTime.subtract(meetingWithPlace.timezone.rawOffset, 'seconds');
    utcTime.subtract(meetingWithPlace.timezone.dstOffset, 'seconds');
    
    for (let i = 0; i < meetingsLen; i++) {
        meetings[i].time = utcTime;

        if (meetings[i].timezone) {
            updateMeetingLocalTime(meetings[i]);
        }
    }
}

/**
 * Update a meeting local time with timezone and dst offset
 * @param {object} meeting 
 */
function updateMeetingLocalTime(meeting) {
    const localTime = meeting.time.clone();
    localTime.add(meeting.timezone.rawOffset, 'seconds');
    localTime.add(meeting.timezone.dstOffset, 'seconds');
    meeting.localTime = localTime;
}

/**
 * Update every meeting local time
 * @param {array} meetings 
 */
function updateMeetingsLocalTime(meetings) {
    const meetingsLen = meetings.length;

    for (let i = 0; i < meetingsLen; i++) {
        if (!meetings[i].timezone) {
            continue;
        }

        updateMeetingLocalTime(meetings[i]);
    }
}

export default function(state = initialMeetings, action) {
    var meetings;

    switch(action.type) {
        case ADD_MEETING:
            return state;
        case CHANGE_PLACE:
            const meetingsWithLocalTime = state.filter((meeting) => { return meeting.localTime !== null; });

            meetings = state.map((meeting) => {
                if (meeting.id === action.payload.id) {
                    meeting.place = action.payload.place;
                    meeting.timezone = action.payload.timezone;
                    updateMeetingLocalTime(meeting);
                }

                return meeting;
            });

            if (!meetingsWithLocalTime.length) {
                setInitialTimeOnMeetings(meetings);
            }

            return meetings;
        case CHANGE_TIME:
            const meetingReference = state.find((meeting) => { return meeting.id === action.payload.id; });
            const utcTime = action.payload.time.clone();
            utcTime.subtract(meetingReference.timezone.rawOffset, 'seconds');
            utcTime.subtract(meetingReference.timezone.dstOffset, 'seconds');

            meetings = state.map((meeting) => {
                meeting.time = utcTime;
                return meeting;
            });

            updateMeetingsLocalTime(meetings);
            return meetings;
        default:
            return state;
    }
}