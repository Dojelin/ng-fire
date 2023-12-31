import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { GalleryDetailComponent } from './gallery-detail/gallery-detail.component';
import { GalleryListComponent } from './gallery-list/gallery-list.component';
import { GalleryService } from './gallery.service';

const routes: Routes = [
  { path: 'gallery', component: GalleryListComponent },
  { path: 'gallery/:id', component: GalleryDetailComponent },
  { path: 'users/:id/:id', component: GalleryDetailComponent },
];

@NgModule({
  declarations: [GalleryListComponent, GalleryDetailComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [GalleryService],
})
export class GalleryModule {}
