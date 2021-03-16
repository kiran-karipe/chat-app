import { Injectable } from '@angular/core';
import { ACTIONS } from '../actions';
import { Store } from '@ngrx/store';
import { Channel } from '../../interfaces/channel';
import { Message } from '../../interfaces/message';

@Injectable({
  providedIn: 'root'
})

export class StoreActionsService {
  constructor(private _store: Store) { }

  updateIncomingMessages(message: any) {
    if (message.type === 'new') {
      this._store.dispatch({
        type: ACTIONS.UPDATE_INCOMING_MESSAGES,
        payload: message
      });
    }
  }

  addNewMessage(message: Message) {
    this._store.dispatch({
      type: ACTIONS.ADD_NEW_MESSAGE,
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

  updateUsersInChannels(userName: string) {
    this._store.dispatch({
      type: ACTIONS.UPDATE_USER_IN_CHANNEL,
      payload: userName
    });
  }
}
