import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.reducer';
const getAppState = createFeatureSelector<AppState>('app');
export const getChannelsData = createSelector(getAppState, state => state.channelsData);
export const getSelectedChannel = createSelector(getAppState, state => state.selectedChannel);
export const getChannels = createSelector(getAppState, state => state.channels);
export const getUserName = createSelector(getAppState, state => state.userName);
export const getSelectedChannelData = createSelector(getAppState, state => state.selectedChannelData);