import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';


export interface AppState {
    loginState: reducers.LoginState,
}



export const appReducers: ActionReducerMap<AppState> = {
    loginState: reducers.uiReducer,
}