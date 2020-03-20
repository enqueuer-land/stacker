export interface CarabinaEnvironment {
    name: string;
    role?: 'none';
    store: {
        [propname: string]: string;
    };
}
