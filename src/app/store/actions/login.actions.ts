import { createAction, props } from '@ngrx/store';
import { LoginModel } from 'src/app/models/login.models';

export const isLoading = createAction(
    '[login Component] Loading Login',
    props<{usuario: LoginModel}>() 
);

export const stopLoading = createAction(
    '[login Component] stopLoading Login',
    props<{datos: any}>()
);

export const loadingError = createAction(
    '[login Component] loadingError Login',
    props<{payload: any}>()
);

export const unSetLogin = createAction('[login Component] unSet Login');