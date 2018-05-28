import { TestModel } from './test-model';

export interface ReportModel {
    readonly name: string;
    readonly valid: boolean;
    readonly tests?: TestModel;
}