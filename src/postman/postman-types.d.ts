export interface Event {
    listen: 'test' | 'prerequest' | string;
    script: {
        exec: string[]
    };
}

export interface Variable {
    key: string;
    value: string;
}

type authType = 'apikey' | 'awsv4' | 'basic' | 'bearer' | 'digest' | 'hawk' | 'noauth' | 'oauth1' | 'oauth2' | 'ntlm';
export type Auth = {
    type: authType;

    [prop: string]: {
        key: string,
        value: string,
        type: string
    }[] | authType;
};

export type Header = {
    key: string;
    value: string;
    disabled?: boolean;
};

type Request = {
    url: {
        raw?: string;
        protocol: string;
        path: string[];
        port?: string;
        query?: {
            key?: string;
            value?: string;
            disabled?: boolean;
        }[];
    };
    auth?: Auth;
    certificate: {
        name: string;
        matches: string[];
        key: {
            src: string;
        };
        cert: {
            src: string;
        };
        passphrase: string;
    };
    method: 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE' |
        'COPY' | 'HEAD' | 'OPTIONS' | 'LINK' | 'UNLINK' |
        'PURGE' | 'LOCK' | 'UNLOCK' | 'PROPFIND' | 'VIEW';
    header?: Header[];
    body?: any;
};

type Response = {
    name: string;
    id: string;
    originalRequest: Request;
    header: Header[];
    body?: string;
    status: string;
    code: number;
};

export interface Item {
    id: string;
    name: string;
    variable?: Variable[];
    event?: Event[];
    request: Request;
    response: Response[];
}

export interface Folder {
    name: string;
    item: (Item | Folder)[];
    variable?: Variable[];
    event?: Event[];
    auth?: Auth;
}

export interface Collection {
    info: {
        name: string;
        _postman_id?: string;
    };
    item: (Item | Folder)[];
    event?: Event[];
    variable?: Variable[];
    auth?: Auth;
}
