export interface EnqueuerResponseReceiver {
    connect(): Promise<void>;
    receiveMessage(): Promise<string>;
    unsubscribe(): void;
}