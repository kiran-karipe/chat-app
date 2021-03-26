import { Action } from '@ngrx/store';
import { ACTIONS } from './shared/actions';
import { Channel } from './interfaces/channel';
import { Message } from './interfaces/message';
import { ChannelData } from './interfaces/channel-data';

interface AppAction extends Action {
    type: string;
    payload?: any;
}

export interface AppState {
    selectedChannel: any;
    channels: Channel[];
    userName: string;
    channelsData: ChannelData[];
    selectedChannelData: ChannelData;
}
export const initialState: AppState = {
    selectedChannel: '',
    channels: [],
    userName: '',
    channelsData: [],
    selectedChannelData: {
        channel: {
          id: -1,
          name: ''
        },
        messages: [],
        users: []
    }
};

export function appReducer(state=initialState, action: AppAction) {
    switch(action.type) {

        case ACTIONS.UPDATE_CHANNELS_DATA:
            let found = false;
            const newChannelsData = state.channelsData.map(channelData => {
                if (channelData.channel.id === action.payload.channel.id) {
                    channelData = action.payload;
                    found = true;
                }
                return channelData;
            })
            if (!found) newChannelsData.push(action.payload)
            return {
                ...state,
                channelsData: newChannelsData
            }
        case ACTIONS.UPDATE_SELECTED_CHANNELS_DATA:
            return {
                ...state,
                selectedChannelData: action.payload
            }
        case ACTIONS.ADD_NEW_MESSAGE_TO_CHANNEL:
            const newChannelsDataMessages = state.channelsData.map(channelData => {
                const tempChannelData = Object.assign({}, channelData);
                if(tempChannelData.channel.id === action.payload.channel_id) {
                    tempChannelData.messages = [...tempChannelData.messages, action.payload];
                }
                return tempChannelData;
            })
            return {
                ...state,
                channelsData: newChannelsDataMessages
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
        default:
            return state;
    }
}