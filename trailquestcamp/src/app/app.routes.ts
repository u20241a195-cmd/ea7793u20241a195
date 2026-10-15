/**
 * Root route table: redirects `/` to `/home`, mounts the TrailQuest child routes and the page-not-found fallback.
 *
 * @author Sofia Diaz Yurivilca
 */
import {inject} from '@angular/core';
import {Routes} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

const pageNotFound = () => import('../shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);
const adventureCampsRoutes = () => import('./adventure-camps/adventure-camps.routes').then(m => m.adventureCampsRoutes);
const translatedTitle = (key: string) => () => inject(TranslateService).get(key);

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '', loadChildren: adventureCampsRoutes},
  {path: '**', loadComponent: pageNotFound, title: translatedTitle('title-page-not-found')}
];
