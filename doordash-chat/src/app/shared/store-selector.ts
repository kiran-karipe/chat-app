import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.reducer';
const getAppState = createFeatureSelector<AppState>('app');
export const getIncomingMessages = createSelector(getAppState, state => state.incomingMessages);
export const getSelectedChannel = createSelector(getAppState, state => state.selectedChannel);
export const getChannels = createSelector(getAppState, state => state.channels);
export const getUserName = createSelector(getAppState, state => state.userName);