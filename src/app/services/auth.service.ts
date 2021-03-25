import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RegistroModel } from '../models/registro.models';
import { LoginModel } from '../models/login.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken: string;

  constructor(private http: HttpClient) {
    this.readToken();
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  login(usuario: LoginModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(`${environment.server}signInWithPassword?key=${environment.apiKey}`, authData
    ).pipe(map( resp => {
      this.saveToken(resp['idToken'], resp['refreshToken'], resp['expiresIn']);
      return resp;
    }));
  }

  readToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }
  }

  refreshToken(){
    const authData = {
      grant_type: 'refresh_token',
      refresh_token: localStorage.getItem('refreshToken')
    };
    return this.http.post(`${environment.serverToken}token?key=${environment.apiKey}`, authData
    ).pipe(map( resp => {
      this.saveToken(resp['id_token'], resp['refresh_token'], resp['expires_in']);
      return resp;
    }));
  }

  isAuthenticated(): boolean{
    if( this.userToken.length < 2){
      return false;
    }

    const expire = Number(localStorage.getItem('tokenExpire'));
    const date = new Date();
    date.setTime(expire);

    if (date > new Date()) {
      return true;
    }else{
      return false;
    }
      
  }

  registrar(usuario: RegistroModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(`${environment.server}signUp?key=${environment.apiKey}`, authData
    ).pipe(map( resp => {
      this.saveToken(resp['idToken'], resp['refreshToken'], resp['expiresIn']);
      return resp;
    }));
  }

  private saveToken(idToken: string, refreshIdToken: string, expireToken: string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    localStorage.setItem('refreshToken', refreshIdToken);

    let date = new Date();
    date.setSeconds(parseInt(expireToken)-100);

    localStorage.setItem('tokenExpire', date.getTime().toString());
  }
}
