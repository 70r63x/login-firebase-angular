import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserIdleService } from 'angular-user-idle';
import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { unSetLogin, unSetRegistro } from '../../store/actions';

import { AlertaComponent } from '../../componentes/sections/alerta/alerta.component';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {

  public idle = 600;
  events: string[] = [];
  opened: boolean = true;
  timer: any;
  private pingExpire: Subscription;

  constructor(
    private userIdle: UserIdleService,
    private auth: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private store: Store<AppState>) {
    this.userIdle.setConfigValues({
      idle: this.idle,
      ping: 60
    });

    const expire = Number(localStorage.getItem('tokenExpire'));
    const date = new Date();
    date.setTime(expire);
    console.log(date, "hora de expirar token");
  }

  ngOnInit(): void {
    this.userIdle.startWatching();
    this.pingExpire = this.userIdle.ping$.subscribe(()=> {
      if(!this.auth.isAuthenticated()){
        this.auth.refreshToken().subscribe();
      }
    });

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
    this.pingExpire.unsubscribe();
    clearTimeout(this.timer);
  }

  salir(){
    this.auth.logout();
    this.dialog.closeAll();
    console.log("salir");
    this.store.dispatch(unSetLogin());
    this.store.dispatch(unSetRegistro());
    this.router.navigateByUrl('/login');
  }

  openAlert(){
    this.dialog.open(AlertaComponent, {data: { icon: 'fas fa-info-circle', titulo: 'Sesión Cerrada', texto: 'La sesión fue cerrada por inactividad en el sistema'}, id: 'mat-dialog-1'});
  }

}
