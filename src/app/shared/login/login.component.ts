import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginModel } from 'src/app/models/login.models';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginform: LoginModel;

  constructor(private auth: AuthService, private router: Router) {
    this.loginform = new LoginModel();
  }

  ngOnInit(): void {
  }

  login(form: NgForm){
    if(!form.valid){
      console.log("invalido");
    }else{
      //activar loading
      console.log(this.loginform)
      this.auth.login(this.loginform).subscribe( resp => {
        console.log(resp);
        this.router.navigateByUrl('/dashboard');
        //cancelar loading
      }, (err) => {
        console.log(err.error.error.message);
        //mostrar error
      });
    }
  }

}
