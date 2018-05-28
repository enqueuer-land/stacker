export interface ResultTimeModel {
    readonly totalTime: number;
    readonly startTime: Date | string;
    readonly endTime: Date | string;
    readonly timeout?: number;
}