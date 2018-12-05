export default class TimeHandler {
    getTimeAgo(from) {
        const templates = {
            prefix: "",
            suffix: " ago",
            seconds: "less than a minute",
            minute: "about a minute",
            minutes: "%d minutes",
            hour: "about an hour",
            hours: "about %d hours",
            day: "a day",
            days: "%d days",
            month: "about a month",
            months: "%d months",
            year: "about a year",
            years: "%d years"
        };
        const template = function (t, n) {
            return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
        };

        const timer = function (time) {
            if (!time)
                return;
            time = time.replace(/\.\d+/, ""); // remove milliseconds
            time = time.replace(/-/, "/").replace(/-/, "/");
            time = time.replace(/T/, " ").replace(/Z/, " UTC");
            time = time.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // -04:00 -> -0400
            time = new Date(time * 1000 || time);

            const now = new Date();
            const seconds = ((now.getTime() - time) * .001) >> 0;
            const minutes = seconds / 60;
            const hours = minutes / 60;
            const days = hours / 24;
            const years = days / 365;

            return templates.prefix + (
                seconds < 45 && template('seconds', seconds) ||
                seconds < 90 && template('minute', 1) ||
                minutes < 45 && template('minutes', minutes) ||
                minutes < 90 && template('hour', 1) ||
                hours < 24 && template('hours', hours) ||
                hours < 42 && template('day', 1) ||
                days < 30 && template('days', days) ||
                days < 45 && template('month', 1) ||
                days < 365 && template('months', days / 30) ||
                years < 1.5 && template('year', 1) ||
                template('years', years)
            ) + templates.suffix;
        };
        return timer(from);
    }

    paddy(num, padlen) {
        const pad = new Array(1 + padlen).join('0');
        return (pad + num).slice(-pad.length);
    }

    getTotalTime(totalTime) {
        let ms = totalTime % 1000;
        let result = ms + 'ms';

        if (totalTime >= 1000) {
            ms = this.paddy(ms, 3);
            let seconds = Math.trunc(totalTime / 1000);
            result = seconds + 's' + ms + 'ms';
            if (seconds >= 60) {
                const minutes = Math.trunc(seconds / 60);
                seconds = this.paddy(seconds % 60, 2);
                result = minutes + 'm' + seconds + 's' + ms + 'ms';
            }
        }
        return result;
    }

}
