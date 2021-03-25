  
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

const _loginReducer = createReducer(initialStateLogin,

    on(actions.isLoadingLogin, state => ({ ...state, isLoading: true})),

    on(actions.stopLoadingLogin, (state, {datos}) => ({ 
        ...state,
        isLoading: false,
        data: {...datos}
    })),

    on(actions.loadingErrorLogin, (state, {payload}) => ({
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

export function loginReducer(state, action) {
    return _loginReducer(state, action);
}