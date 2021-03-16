import { Message } from './message';

export interface SocketMessage {
    type: string;
    message: Message;
};