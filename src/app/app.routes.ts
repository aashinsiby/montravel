import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ApplicationComponent } from './application/application.component';

export const routes: Routes = [
 {
  path:'', redirectTo: 'home', pathMatch:"full"
 },
  
 { path: 'home', component: HomeComponent},
 { path: 'app', component: ApplicationComponent},




];
