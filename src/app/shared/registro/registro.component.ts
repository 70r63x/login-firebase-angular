import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegistroModel } from 'src/app/models/registro.models';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { Subscription } from 'rxjs';
import { isLoadingRegistro } from '../../store/actions';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit, OnDestroy {

  usuario: RegistroModel;
  cargando: boolean = false;
  registroSubscriptions: Subscription;

  constructor(private router: Router, private store: Store<AppState>) {
    this.usuario = new RegistroModel();
  }

  ngOnInit(): void {
    this.registroSubscriptions = this.store.select('dataRegistro').subscribe(({data, isLoading}) =>{
      this.cargando = isLoading;
      if(data !== null){
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  ngOnDestroy(){
    this.registroSubscriptions.unsubscribe();
  }

  crearCuenta( form: NgForm){
    if(!form.valid){
      console.log("invalido");
    }else{
      this.store.dispatch(isLoadingRegistro({usuario: this.usuario}));
    }
    
  }

}
