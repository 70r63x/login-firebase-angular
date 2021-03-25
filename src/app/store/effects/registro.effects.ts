import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as registroActions from '../actions/registro.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

@Injectable()
export class RegistroEffects {
    
    constructor(
        private actions$: Actions,
        private _service: AuthService
    ){}

    CargaRegistroDatos$ = createEffect(
        () => this.actions$.pipe(
            ofType( registroActions.isLoadingRegistro ),
            mergeMap(
                (datosUser) => this._service.registrar(datosUser.usuario)
                    .pipe(
                        map( data => registroActions.stopLoadingRegistro({ datos: data }) ),
                        catchError( err => of(registroActions.loadingErrorRegistro({ payload: err })) )
                    )
            )
        )
    );

}