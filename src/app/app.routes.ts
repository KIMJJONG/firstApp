import { Routes } from '@angular/router';
import { NumberComponent } from './number/number.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: 'homeComponent', component: HomeComponent },
    { path: 'numberComponent', component: NumberComponent },
];
