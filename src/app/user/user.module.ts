import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostModule } from '../post/post.module';
import { routingGuard } from '../routing.guard';
import { SharedModule } from '../shared/shared.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListItemComponent } from './user-list-item/user-list-item.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from './user.service';

const routes: Routes = [
  {
    path: 'me',
    component: UserDashboardComponent,
    canActivate: [routingGuard],
    data: { title: 'Dashboard' },
  },
  {
    path: 'users',
    component: UserListComponent,
    data: { title: 'Users' },
  },
  {
    path: 'users/:id',
    component: UserDetailComponent,
    data: { title: 'Profile' },
  },
];

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserDetailComponent,
    UserListComponent,
    UserListItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    PostModule,
  ],
  providers: [UserService],
})
export class UserModule {}
