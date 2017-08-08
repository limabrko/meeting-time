import { 
        ADD_MEETING, 
        CHANGE_SOURCE, 
        CHANGE_TIME
    } from '../actions/index';
import moment from 'moment';
import { PLACE } from '../components/Source';

const initialTime = moment.utc();
const meetingData = {
        source: null,
        time: initialTime,
        timezoneOutdated: false,
        localTime: null
    };

const initialMeetings = [];
addMeeting(initialMeetings);
addMeeting(initialMeetings);

/**
 * Add new meeting to a list
 * @param {array} meetings 
 */
function addMeeting(meetings) {
    var newMeeting = Object.assign({}, meetingData);
    newMeeting.id = meetings.length + 1;
    newMeeting.placeholder = `Type a city or timezone ${newMeeting.id}`;
    meetings.push(newMeeting);
}

/**
 * Update a meeting local time with timezone and dst offset
 * @param {object} meeting 
 */
function updateMeetingLocalTime(meeting) {
    var localTime = meeting.time.clone();
    localTime.add(meeting.source.timezone.rawOffset, 'seconds');
    localTime.add(meeting.source.timezone.dstOffset, 'seconds');
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
            meetings = state.slice();
            addMeeting(meetings);
            return meetings;
        case CHANGE_SOURCE:
            meetings = state.map((meeting) => {
                if (meeting.id === action.payload.id) {
                    meeting.source = action.payload.source;
                    meeting.timezoneOutdated = false;
                    updateMeetingLocalTime(meeting);
                }
                return meeting;
            });

            return meetings;
        case CHANGE_TIME:
            const utcTime = action.payload.time.clone();
            utcTime.subtract(action.payload.source.timezone.rawOffset, 'seconds');
            utcTime.subtract(action.payload.source.timezone.dstOffset, 'seconds');

            meetings = state.map((meeting) => {
                meeting.time = utcTime.clone();

                // The meeting that change time do not need to update timezone
                if (meeting.id === action.payload.id) {
                    meeting.source = action.payload.source;
                    updateMeetingLocalTime(meeting);
                    return meeting;
                }

                if (meeting.source && meeting.source.type === PLACE) {
                    meeting.timezoneOutdated = true;
                }

                if (meeting.source) {
                    updateMeetingLocalTime(meeting);
                }
                return meeting;
            });

            return meetings;
        default:
            return state;
    }
}