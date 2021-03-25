import { createAction, props } from '@ngrx/store';
import { RegistroModel } from 'src/app/models/registro.models';

export const isLoadingRegistro = createAction(
    '[Registro Component] Loading Registro',
    props<{usuario: RegistroModel}>() 
);

export const stopLoadingRegistro = createAction(
    '[Registro Component] stopLoading Registro',
    props<{datos: any}>()
);

export const loadingErrorRegistro = createAction(
    '[Registro Component] loadingError Registro',
    props<{payload: any}>()
);

export const unSetRegistro = createAction('[Registro Component] unSet Registro');