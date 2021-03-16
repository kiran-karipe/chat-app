export interface Message {
    name: string;
    message: string;
    id: string;
    reaction?: any;
    type?: string;
    channel_id?: number;
}
