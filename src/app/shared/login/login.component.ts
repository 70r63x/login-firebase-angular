import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginModel } from 'src/app/models/login.models';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { Subscription } from 'rxjs';
import { isLoadingLogin } from '../../store/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginform: LoginModel;
  cargando: boolean = false;
  loginSubscriptions: Subscription;

  constructor(private router: Router, private store: Store<AppState>) {
    this.loginform = new LoginModel();
  }

  ngOnInit(): void {
    this.loginSubscriptions = this.store.select('dataLogin').subscribe(({data, isLoading}) =>{
      this.cargando = isLoading;
      if(data !== null){
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  ngOnDestroy(){
    this.loginSubscriptions.unsubscribe();
  }

  login(form: NgForm){
    if(!form.valid){
      console.log("invalido");
    }else{
      this.store.dispatch(isLoadingLogin({usuario: this.loginform}));
    }
  }

}
