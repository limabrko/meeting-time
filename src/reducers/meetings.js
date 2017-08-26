import { 
        ADD_MEETING, 
        CHANGE_SOURCE, 
        CHANGE_TIME,
        CHANGE_HOUR_AND_MINUTE,
        CHANGE_WORKTIME
    } from '../actions/index';
import moment from 'moment';
import { PLACE } from '../components/Source';

const initialTime = moment.utc();
const meetingData = {
        source: null,
        time: initialTime,
        timezoneOutdated: false,
        localTime: null,
        startWorktime: 540,
        endWorktime: 1080,
        isWorktime: null
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

    const anotherMeetingWithTime = meetings.find((meeting) => {
        return meeting.localTime !== null;
    });
    if (anotherMeetingWithTime) {
        newMeeting.time = anotherMeetingWithTime.time.clone();
    }

    meetings.push(newMeeting);
}

/**
 * Verify if localtime is on worktime
 * @param {object} meeting 
 */
function verifyWorktime(meeting) {
    meeting.isWorktime = false;
    const minutes = meeting.localTime.minutes();
    const hoursMinutes = meeting.localTime.hours() * 60;
    const dayMinutes = minutes + hoursMinutes;

    if (dayMinutes >= meeting.startWorktime && 
        dayMinutes <= meeting.endWorktime) {
        meeting.isWorktime = true;
    }
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

    verifyWorktime(meeting);
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
        case CHANGE_HOUR_AND_MINUTE:
            meetings = state.map((meeting) => {
                var newTime = meeting.time.clone();
                newTime[action.payload.type](action.payload.minutes, 'minutes')
                meeting.time = newTime;

                if (meeting.localTime) {
                    updateMeetingLocalTime(meeting);
                }

                return meeting;
            });

            return meetings;
        case CHANGE_WORKTIME:
            meetings = state.map((meeting) => {
                if (meeting.id === action.payload.id) {
                    // const oppositeType = action.payload.type === 'startWorktime' ? 'endWorktime' : 'startWorktime';
                    // var oppositeMinutes = meeting[oppositeType];
                    // var minutes = action.payload.minutes;

                    meeting[action.payload.type] = action.payload.minutes;

                    // Start cannot be higher than end and vice-versa
                    // if (oppositeType === 'startWorktime') {
                    //     minutes = (1440 - minutes);
                    //     oppositeMinutes = (1440 - oppositeMinutes);
                    // }

                    // if (minutes > oppositeMinutes) {
                    //     meeting[action.payload.type] = meeting[oppositeType];
                    // }

                    verifyWorktime(meeting);
                }

                return meeting;
            });

            return meetings;
        default:
            return state;
    }
}