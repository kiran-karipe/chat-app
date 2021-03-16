import { Message } from './message';

export interface Channel {
    name: string,
    id: number, 
    users: string[], 
    messages: Message[]
}