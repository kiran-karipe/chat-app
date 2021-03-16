import { Action } from '@ngrx/store';
import { ACTIONS } from './shared/actions';
import { Channel } from './interfaces/channel';
import { Message } from './interfaces/message';

interface AppAction extends Action {
    type: string;
    payload?: any;
}

export interface AppState {
    incomingMessages: any;
    selectedChannel: any;
    channels: Channel[];
    userName: string;
}
export const initialState: AppState = {
    incomingMessages: [],
    selectedChannel: '',
    channels: [],
    userName: '',
};

export function appReducer(state=initialState, action: AppAction) {
    switch(action.type) {
        case ACTIONS.UPDATE_INCOMING_MESSAGES:
            return {
                ...state,
                incomingMessages: [...state.incomingMessages, action.payload]
            }
        case ACTIONS.ADD_NEW_MESSAGE:
            const newChannels = state.channels.map((channel) => {
                const tempChannel = Object.assign({}, channel);
                if(tempChannel.id === action.payload.channel_id) {
                    tempChannel.messages = [...tempChannel.messages, action.payload];
                }
                return tempChannel;
            });

            return {
                ...state,
                channels: newChannels
            }
        case ACTIONS.UPDATE_SELECTED_CHANNEL:
            return {
                ...state,
                selectedChannel: action.payload
            }
        case ACTIONS.UPDATE_CHANNELS:
            return {
                ...state,
                channels: action.payload
            }
        case ACTIONS.UPDATE_USERNAME:
            return {
                ...state,
                userName: action.payload
            }
        case ACTIONS.UPDATE_USER_IN_CHANNEL:
            const updateChannels = state.channels.map((channel) => {
                const tempChannel = Object.assign({}, channel);
                tempChannel.users = [action.payload, ...tempChannel.users];
                return tempChannel;
            });
            return {
                ...state,
                channels: updateChannels
            }
        default:
            return state;
    }
}