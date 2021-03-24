  
import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';

export interface LoginState {
    isLoading: boolean,
    data: any,
    error: any
}

export const initialStateLogin: LoginState = {
   isLoading: false,
   data: null,
   error: null
}

const _uiReducer = createReducer(initialStateLogin,

    on(actions.isLoading, state => ({ ...state, isLoading: true})),

    on(actions.stopLoading, (state, {datos}) => ({ 
        ...state,
        isLoading: false,
        data: {...datos}
    })),

    on(actions.loadingError, (state, {payload}) => ({
        ...state,
        isLoading: false,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message
        }
    })),

    on(actions.unSetLogin, (state) => ({ ...state, data: null}))

);

export function uiReducer(state, action) {
    return _uiReducer(state, action);
}