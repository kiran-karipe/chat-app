import { Action } from '@ngrx/store';
import { ACTIONS } from './shared/actions';

interface AppAction extends Action {
    type: string;
    payload?: any;
}

export interface AppState {
    incomingMessages: any;
}
export const initialState: AppState = {
    incomingMessages: [],
};

export function appReducer(state=initialState, action: AppAction) {
    switch(action.type) {
        case ACTIONS.UPDATE_INCOMING_MESSAGES:
            return {
                ...state,
                incomingMessages: [...state.incomingMessages, action.payload]
            }
        default:
            return state;
    }
}