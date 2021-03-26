import { Injectable } from '@angular/core';
import { ACTIONS } from '../actions';
import { Store } from '@ngrx/store';
import { Channel } from '../../interfaces/channel';
import { Message } from '../../interfaces/message';
import { ChannelData } from '../../interfaces/channel-data';

@Injectable({
  providedIn: 'root'
})

export class StoreActionsService {
  constructor(private _store: Store) { }

  addNewMessageToChannelsData(message: Message) {
    this._store.dispatch({
      type: ACTIONS.ADD_NEW_MESSAGE_TO_CHANNEL,
      payload: message
    });
  }

  updateSelectedChannel(channel: any) {
    this._store.dispatch({
      type: ACTIONS.UPDATE_SELECTED_CHANNEL,
      payload: channel
    });
  }

  updateChannels(channels: Channel[]) {
    this._store.dispatch({
      type: ACTIONS.UPDATE_CHANNELS,
      payload: channels
    });
  }

  updateUserName(userName: string) {
    this._store.dispatch({
      type: ACTIONS.UPDATE_USERNAME,
      payload: userName
    });
  }

  updateUsers(users: any) {
    this._store.dispatch({
      type: ACTIONS.UPDATE_USERS,
      payload: users
    });
  }

  updateMessages(messages: any) {
    this._store.dispatch({
      type: ACTIONS.UPDATE_MESSAGES,
      payload: messages
    });
  }

  updateChannelsData(channelData: ChannelData) {
    this._store.dispatch({
      type: ACTIONS.UPDATE_CHANNELS_DATA,
      payload: channelData
    });
  }

  updateSelectedChannelsData(channelData: ChannelData) {
    this._store.dispatch({
      type: ACTIONS.UPDATE_SELECTED_CHANNELS_DATA,
      payload: channelData
    });
  }

  getState() {
    let state = {};
    this._store.subscribe(appState => { 
      state = appState;
    })
    return state;
  }
}
