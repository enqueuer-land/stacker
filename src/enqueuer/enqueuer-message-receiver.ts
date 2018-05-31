export interface EnqueuerMessageReceiver {
    connect(): Promise<void>;
    receiveMessage(): Promise<string>;
    unsubscribe(): void;
}