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
    users: string[];
    messages: Message[];
    channelsInformation: any;
}
export const initialState: AppState = {
    incomingMessages: [],
    selectedChannel: '',
    channels: [],
    userName: '',
    users: [],
    messages: [],
    channelsInformation: []
};

export function appReducer(state=initialState, action: AppAction) {
    switch(action.type) {
        case ACTIONS.ADD_NEW_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
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
        case ACTIONS.UPDATE_USERS:
            return {
                ...state,
                users: action.payload
            }
        case ACTIONS.UPDATE_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }
        default:
            return state;
    }
}