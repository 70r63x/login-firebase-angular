import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginModel } from 'src/app/models/login.models';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { Subscription } from 'rxjs';
import { isLoading } from '../../store/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginform: LoginModel;
  cargando: boolean = false;
  uiSubscriptions: Subscription;

  constructor(private auth: AuthService, private router: Router, private store: Store<AppState>) {
    this.loginform = new LoginModel();
  }
  // ui => this.cargando = ui.isLoading
  ngOnInit(): void {
    this.uiSubscriptions = this.store.select('dataLogin').subscribe(({data, isLoading}) =>{
      this.cargando = isLoading;
      if(data !== null){
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  ngOnDestroy(){
    this.uiSubscriptions.unsubscribe();
  }

  login(form: NgForm){
    if(!form.valid){
      console.log("invalido");
    }else{
      this.store.dispatch(isLoading({usuario: this.loginform}));
    }
  }

}
