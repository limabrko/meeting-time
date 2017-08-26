/**
 * Create date intervals
 * @param {Moment} date
 * @return {array}
 */
export function createIntervals(date, increment = 30) {
    var intervals = [],
        intervalDate,
        minutes = 0;

    const baseDate = date.clone().startOf('date');
    const minutesInDay = 1440;

    while(minutes < minutesInDay) {
        intervalDate = baseDate.clone().add(minutes, 'minutes');
        intervals.push({
            minutes,
            formatted: intervalDate.format('HH:mm'),
            date: intervalDate
        });
        minutes += increment;
    }
    return intervals;
};

/**
* Pad a string with specified character
* @param {string} str
* @param {number} padLength
* @param {string} charToAdd
*/
export function padLeft(str, padLength, charToAdd = '0') {
    if(typeof str !== 'string') {
        str = String(str);
    }

    const len = str.length;

    for(let i = len; i < padLength; i++) {
        str = charToAdd + str;
    }

    return str;
};

/**
 * Format minutes to HH:mm
 * @param {number} minutes
 * @return {string}
 */
export function formatMinutesToHour(minutes) {
    const hours = Math.floor(minutes / 60);
    const hourMinutes = Math.floor(minutes % 60);
    const hoursFormatted = padLeft(hours, 2);
    const minutesFormatted = padLeft(hourMinutes, 2);

    return (`${hoursFormatted}:${minutesFormatted}`);
};

/**
 * Conver HH:mm to minutes
 * @param {string} str | HH:mm
 * @return {number}
 */
export function convertHHmmToMinutes(str) {
    const strSplitted = str.split(':');
    const hours = parseInt(strSplitted[0], 10);
    const minutes = parseInt(strSplitted[1], 10);

    return (minutes + (hours * 60));
};