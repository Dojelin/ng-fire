import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent, data: { title: 'Sign in' } },
  { path: 'signup', component: SignupComponent, data: { title: 'Sign up' } },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: { title: 'Reset password' },
  },
];

@NgModule({
  declarations: [SigninComponent, SignupComponent, ResetPasswordComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [],
})
export class AuthModule {}
