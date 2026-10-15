/**
 * Route tree of the TrailQuest bounded context (Home and New Reservation views).
 *
 * @author Sofia Diaz Yurivilca
 */
import {Routes} from '@angular/router';
import {inject} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

const home = () => import('./presentation/views/home/home').then(m => m.Home);
const reservationForm = () => import('./presentation/views/reservation-form/reservation-form').then(m => m.ReservationForm);
const translatedTitle = (key: string) => () => inject(TranslateService).get(key);

export const adventureCampsRoutes: Routes = [
  {path: 'home', loadComponent: home, title: translatedTitle('title-home')},
  {path: 'reservations/new', loadComponent: reservationForm, title: translatedTitle('title-new-reservation')}
];
