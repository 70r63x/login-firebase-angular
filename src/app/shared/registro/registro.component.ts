import { Component, OnInit } from '@angular/core';
import { RegistroModel } from 'src/app/models/registro.models';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: RegistroModel;

  constructor(private auth: AuthService, private router: Router) {
    this.usuario = new RegistroModel();
  }

  ngOnInit(): void {
  }

  crearCuenta( form: NgForm){
    if(!form.valid){
      console.log("invalido");
    }else{
      this.auth.registrar(this.usuario).subscribe( resp => {
        console.log(resp);
        this.router.navigateByUrl('/dashboard');
      }, (err) => {
        console.log(err.error.error.message);
      });
    }
    
  }

}
