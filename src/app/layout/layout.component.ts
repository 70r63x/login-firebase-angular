import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserIdleService } from 'angular-user-idle';
import { MatDialog } from '@angular/material/dialog';

import { AlertaComponent } from '../sections/alerta/alerta.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {

  public idle = 600;
  events: string[] = [];
  opened: boolean = true;

  constructor(private userIdle: UserIdleService, private auth: AuthService, private router: Router, public dialog: MatDialog) {
    this.userIdle.setConfigValues({
      idle: this.idle
    });

    const expire = Number(localStorage.getItem('tokenExpire'));
    const date = new Date();
    date.setTime(expire)
    console.log(date, "hora de expirar token");
  }

  ngOnInit(): void {
    this.userIdle.startWatching();

    this.userIdle.onTimerStart().subscribe(resp => {
      if(resp){
        console.log("expireInactividad");
        this.auth.logout();
        this.router.navigateByUrl('/login');
        this.dialog.closeAll();
        this.openAlert();
      }
    });
  }

  ngOnDestroy(){
    this.userIdle.stopWatching();
    this.userIdle.stopTimer();
  }

  salir(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  openAlert(){
    this.dialog.open(AlertaComponent, {data: { icon: 'fas fa-info-circle', titulo: 'Sesión Cerrada', texto: 'La sesión fue cerrada por inactividad en el sistema'}, id: 'mat-dialog-1'});
  }

}
