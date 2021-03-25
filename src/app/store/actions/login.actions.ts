import { createAction, props } from '@ngrx/store';
import { LoginModel } from 'src/app/models/login.models';

export const isLoadingLogin = createAction(
    '[login Component] Loading Login',
    props<{usuario: LoginModel}>() 
);

export const stopLoadingLogin = createAction(
    '[login Component] stopLoading Login',
    props<{datos: any}>()
);

export const loadingErrorLogin = createAction(
    '[login Component] loadingError Login',
    props<{payload: any}>()
);

export const unSetLogin = createAction('[login Component] unSet Login');