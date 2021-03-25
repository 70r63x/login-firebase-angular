import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';


export interface AppState {
    dataLogin: reducers.LoginState,
    dataRegistro: reducers.RegistroState
}


export const appReducers: ActionReducerMap<AppState> = {
    dataLogin: reducers.loginReducer,
    dataRegistro: reducers.registroReducer
}