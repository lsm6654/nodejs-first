class TimeUtils {
    private static readonly time_formmater = '^(AM|PM) (0[0-9]|1[0-2]|[0-9]):[0-5][0-9]:[0-5][0-9]$';

    static testFunction(inputTime: string, n: number, timePattern = this.time_formmater): string {
        if (!new RegExp(timePattern).test(inputTime)) {
            throw "IllegalArgumentException";
        }

        const meridiemTypeSplit = inputTime.split(" ");
        const timeSplit = inputTime.match(/\d+/g);

        if (!timeSplit || timeSplit.length != 3) {
            throw "IllegalArgumentException";
        }

        let hours = +timeSplit[0];
        const minutes = +timeSplit[1];
        const seconds = +timeSplit[2];
        if (meridiemTypeSplit[0] == 'PM') {
            hours += 12;
        }

        const timestamp: number = this.transformToTimestamp(hours, minutes, seconds) + n;
        const time = this.transformToTime(timestamp);

        return time.toString();
    }

    static transformToTimestamp(hours: number, minutes: number, seconds: number): number {
        return hours * 3600 + minutes * 60 + seconds;
    }

    static transformToTime(timestamp: number): Time {
        const seconds = timestamp % 60;
        let others = Math.floor(timestamp / 60);
        const minutes = others % 60;
        others = Math.floor(others / 60);
        const hours = others % 24;

        return new Time(hours, minutes, seconds);
    }
}

export class Time {
    private hours: number;
    private minutes: number;
    private seconds: number;
    private delimiter: string;

    constructor(hours: number, minutes: number, seconds: number) {
        this.hours = hours;
        this.minutes= minutes;
        this.seconds = seconds;
        this.delimiter = ":";
    }

    toString(): string {
        return this.fillLeftPadding(this.hours, 2) + this.delimiter +
            this.fillLeftPadding(this.minutes, 2) + this.delimiter +
            this.fillLeftPadding(this.seconds, 2);
    }

    fillLeftPadding(num: number, size: number): string {
        let s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }
}

console.assert(TimeUtils.testFunction("PM 09:21:31", 0) === "21:21:31");
console.assert(TimeUtils.testFunction("PM 09:21:31", 200000) === "04:54:51");

console.assert(TimeUtils.testFunction("AM 09:21:31", 1) === "09:21:32");
console.assert(TimeUtils.testFunction("AM 09:21:31", 61) === "09:22:32");
console.assert(TimeUtils.testFunction("AM 09:21:31", 3661) === "10:22:32");

console.assert(TimeUtils.testFunction("PM 09:21:31", 1) === "21:21:32");
console.assert(TimeUtils.testFunction("PM 09:21:31", 61) === "21:22:32");
console.assert(TimeUtils.testFunction("PM 09:21:31", 3661) === "22:22:32");

console.assert(TimeUtils.testFunction("PM 09:21:31", 29) === "21:22:00");
console.assert(TimeUtils.testFunction("PM 09:21:31", 2309) === "22:00:00");
console.assert(TimeUtils.testFunction("PM 09:21:31", 9509) === "00:00:00");