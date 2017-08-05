import axios from 'axios';

const timezones = axios.get('/timezones_abbreviations.json');
const TimezoneService = {
    getTimezones: (value) => {
        const valueInLowerCase = value.toLowerCase();

        return new Promise((resolve, reject) => {
            timezones.then((response) => {
                const matchTimezones = response.data.filter((timezone) => {
                    if (timezone.abbr.toLowerCase().indexOf(valueInLowerCase) > -1) {
                        return true;
                    }

                    if (timezone.name.toLowerCase().indexOf(valueInLowerCase) > -1) {
                        return true;
                    }

                    return false;
                });
                console.log(matchTimezones);
                resolve(matchTimezones);
            });
        })
    }
};

export default TimezoneService;