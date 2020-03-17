import * as fs from 'fs';
import * as yaml from 'yamljs';
import {EnvironmentSaver} from "@/environments/environment-saver";

jest.mock('fs');

const writeFileMock = jest.fn((name, item, cb) => cb());
// @ts-ignore
fs.writeFile.mockImplementation(writeFileMock);

describe('EnvironmentSaver', () => {
    it('should save yamlized', async () => {
        const environment = {
            name: 'name',
            store: {
                key: 'value'
            }
        };

        await new EnvironmentSaver().save('filename', environment);

        expect(writeFileMock).toHaveBeenCalledWith('filename',
            yaml.stringify(environment, 100, 2),
            expect.any(Function));
    });
});
