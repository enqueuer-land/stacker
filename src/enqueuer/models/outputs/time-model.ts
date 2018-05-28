export interface TimeModel {
    readonly totalTime: number;
    readonly startTime: Date | string;
    readonly endTime: Date | string;
    readonly timeout?: number;
}