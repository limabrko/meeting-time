const Utils = {
    /**
     * Create date intervals
     * @param {Moment} date
     * @return {array}
     */
    createIntervals: (date, increment = 30) => {
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
    }
};

export default Utils;