  
import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions';

export interface RegistroState {
    isLoading: boolean,
    data: any,
    error: any
}

export const initialStateRegistro: RegistroState = {
   isLoading: false,
   data: null,
   error: null
}

const _registroReducer = createReducer(initialStateRegistro,

    on(actions.isLoadingRegistro, state => ({ ...state, isLoading: true})),

    on(actions.stopLoadingRegistro, (state, {datos}) => ({ 
        ...state,
        isLoading: false,
        data: {...datos}
    })),

    on(actions.loadingErrorRegistro, (state, {payload}) => ({
        ...state,
        isLoading: false,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message
        }
    })),

    on(actions.unSetRegistro, (state) => ({ ...state, data: null}))

);

export function registroReducer(state, action) {
    return _registroReducer(state, action);
}