import { 
        ADD_MEETING, 
        CHANGE_SOURCE, 
        CHANGE_TIME
    } from '../actions/index';
import moment from 'moment';
import { PLACE } from '../components/Source';

const initialTime = moment();
const meetingData = {
        isPlace: () => {
            if (!this.source) {
                return false;
            }
            return this.source.type === PLACE;
        },
        source: null,
        time: initialTime,
        timezone: null,
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
 * Calculate the intial time for meeting based on first source inserted
 * @param {array} meetings 
 */
function setInitialTimeOnMeetings(meetings) {
    const currentTime = moment();
    const meetingsLen = meetings.length;
    const meetingWithTimezone = meetings.find((meeting) => { return meeting.timezone !== null; });

    const utcTime = currentTime.clone();
    utcTime.subtract(meetingWithTimezone.timezone.rawOffset, 'seconds');
    utcTime.subtract(meetingWithTimezone.timezone.dstOffset, 'seconds');
    
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
        case CHANGE_SOURCE:
            const meetingsWithLocalTime = state.filter((meeting) => { return meeting.localTime !== null; });

            meetings = state.map((meeting) => {
                if (meeting.id === action.payload.id) {
                    meeting.source = action.payload.source;
                    meeting.timezone = meeting.source.timezone;
                    meeting.timezoneOutdated = false;
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

                if (meeting.isPlace()) {
                    meeting.timezoneOutdated = true;
                }

                return meeting;
            });

            return meetings;
        default:
            return state;
    }
}