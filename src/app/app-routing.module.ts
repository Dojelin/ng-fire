import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryListComponent } from './gallery/gallery-list/gallery-list.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/users',
  //   pathMatch: 'full',
  // },
  { path: '', component: GalleryListComponent },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
