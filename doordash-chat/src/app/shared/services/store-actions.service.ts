import { Injectable } from '@angular/core';
import { ACTIONS } from '../actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class StoreActionsService {
  constructor(private _store: Store) { }

  updateIncomingMessages(message: any) {
    this._store.dispatch({
      type: ACTIONS.UPDATE_INCOMING_MESSAGES,
      payload: message
    });
  }
}
