  
import { createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from '../actions';

export interface LoginState {
    isLoading: boolean; 
}

export const initialStateLogin: LoginState = {
   isLoading: false,
}

const _uiReducer = createReducer(initialStateLogin,

    on(isLoading, state => ({ ...state, isLoading: true})),
    on(stopLoading, state => ({ ...state, isLoading: false})),

);

export function uiReducer(state, action) {
    return _uiReducer(state, action);
}