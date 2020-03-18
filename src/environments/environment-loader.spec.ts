import * as fs from 'fs';
import * as yaml from 'yamljs';
import {EnvironmentLoader} from '@/environments/environment-loader';

jest.mock('fs');

describe('EnvironmentLoader', () => {

    it('should throw when no store exists', async () => {
        const fileContent = {
            name: 'grandRequisition'
        };
        const buffered = Buffer.from(JSON.stringify(fileContent));
        // @ts-ignore
        fs.readFile.mockImplementationOnce((filename, cb) => cb(null, buffered));

        let error;
        try {
            await EnvironmentLoader.loadFile('filename');
        } catch (e) {
            error = e;
        }
        expect(error).toBe('Error loading environment');
    });

    it('should load every store key', async () => {
        const fileContent = {
            name: 'grandRequisition',
            store: {
                key: '1',
                anotherKey: '2',
            }
        };
        const buffered = Buffer.from(JSON.stringify(fileContent));
        // @ts-ignore
        fs.readFile.mockImplementationOnce((filename, cb) => cb(null, buffered));

        const env = await EnvironmentLoader.loadFile('filename');

        expect(env).toEqual({
            id: expect.any(String),
            name: 'grandRequisition',
            store: {
                anotherKey: '2',
                key: '1'
            }
        })
    });

    it('should load yml files', async () => {
        const fileContent = {
            name: 'grandRequisition',
            store: {
                key: '1',
                anotherKey: '2',
            }
        };
        const buffered = Buffer.from(yaml.stringify(fileContent, 100, 2));
        // @ts-ignore
        fs.readFile.mockImplementationOnce((filename, cb) => cb(null, buffered));

        const env = await EnvironmentLoader.loadFile('filename');

        expect(env).toEqual({
            id: expect.any(String),
            name: 'grandRequisition',
            store: {
                anotherKey: '2',
                key: '1'
            }
        })
    });

    it('should fail when postman has no value attribute', async () => {
        const fileContent = {
            name: 'grandRequisition',
        };
        const buffered = Buffer.from(JSON.stringify(fileContent));
        // @ts-ignore
        fs.readFile.mockImplementationOnce((filename, cb) => cb(null, buffered));

        let error;
        try {
            await EnvironmentLoader.loadPostmanEnvironment('filename');
        } catch (e) {
            error = e;
        }
        expect(error).toBe('Error importing postman collection');
    });

    it('should pass with valid postman env', async () => {
        const fileContent = {
            name: 'grandRequisition',
            values: [
                {
                    enabled: true,
                    key: 'key',
                    value: 'value',
                },
                {
                    disabled: true,
                    disabledKey: 'disabledKey',
                    disabledValue: 'disabledValue',
                }
            ]
        };
        const buffered = Buffer.from(JSON.stringify(fileContent));
        // @ts-ignore
        fs.readFile.mockImplementationOnce((filename, cb) => cb(null, buffered));

        expect(await EnvironmentLoader.loadPostmanEnvironment('filename')).toEqual({
            id: expect.any(String),
            name: 'grandRequisition',
            store: {
                key: 'value'
            }
        });
    });
});
