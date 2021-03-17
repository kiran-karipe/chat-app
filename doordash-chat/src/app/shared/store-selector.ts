import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.reducer';
const getAppState = createFeatureSelector<AppState>('app');
export const getSelectedChannel = createSelector(getAppState, state => state.selectedChannel);
export const getChannels = createSelector(getAppState, state => state.channels);
export const getUserName = createSelector(getAppState, state => state.userName);
export const getUsers = createSelector(getAppState, state => state.users);
export const getMessages = createSelector(getAppState, state => state.messages);