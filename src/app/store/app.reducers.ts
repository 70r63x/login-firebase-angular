import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';


export interface AppState {
    dataLogin: reducers.LoginState,
}



export const appReducers: ActionReducerMap<AppState> = {
    dataLogin: reducers.uiReducer,
}