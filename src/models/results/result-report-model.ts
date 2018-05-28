import { ResultTestModel } from './result-test-model';

export interface ResultReportModel {
    readonly name: string;
    readonly valid: boolean;
    readonly tests?: ResultTestModel;
}