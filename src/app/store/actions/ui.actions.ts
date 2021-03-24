import { createAction, props } from '@ngrx/store';
import { LoginModel } from 'src/app/models/login.models';

export const isLoading = createAction(
    '[ui Component] is Loading Login',
    props<{usuario: LoginModel}>() 
);

export const stopLoading = createAction(
    '[ui Component] stop Loading Login',
    props<{datos: any}>()
);

export const loadingError = createAction(
    '[ui Component] loading Error Login',
    props<{payload: any}>()
);

export const unSetLogin = createAction('[ui Component] unSet Login');