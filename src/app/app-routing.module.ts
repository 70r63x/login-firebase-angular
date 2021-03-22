import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './shared/login/login.component';
import { RegistroComponent } from './shared/registro/registro.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  { path: '', component: LoginComponent },
  { 
		path: '', 
		component: LayoutComponent,
		children: [
      { path: 'dashboard', component: HomeComponent }
		], canActivate: [ AuthGuard ]
  },
  { path: '**', redirectTo: 'registro' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
