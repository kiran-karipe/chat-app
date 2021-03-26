import { Channel } from './channel';
import { Message } from './message';


export interface ChannelData {
    channel: Channel;
    messages: Message[];
    users: string[];
}