import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginModel } from 'src/app/models/login.models';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { Subscription } from 'rxjs';
import { isLoading, stopLoading } from '../../store/actions';

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

  ngOnInit(): void {
    this.uiSubscriptions = this.store.select('loginState').subscribe(ui => this.cargando = ui.isLoading);
  }

  ngOnDestroy(){
    this.uiSubscriptions.unsubscribe();
  }

  login(form: NgForm){
    if(!form.valid){
      console.log("invalido");
    }else{
      //activar loading
      this.store.dispatch(isLoading());
      this.auth.login(this.loginform).subscribe( resp => {
        console.log(resp);
        this.store.dispatch(stopLoading());
        this.router.navigateByUrl('/dashboard');
        //cancelar loading
      }, (err) => {
        this.store.dispatch(stopLoading());
        console.log(err.error.error.message);
        //mostrar error
      });
    }
  }

}
