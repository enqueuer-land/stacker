export interface EnqueuerResponseServer {
    connect(): Promise<void>;
    receiveMessage(): Promise<string>;
    unsubscribe(): void;
}