import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'singin', component: SigninComponent, data: { title: 'Sign in' } },
  { path: 'singup', component: SignupComponent, data: { title: 'Sign up' } },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: { title: 'Reset password' },
  },
];

@NgModule({
  declarations: [SigninComponent, SignupComponent, ResetPasswordComponent],
  imports: [RouterModule.forChild(routes)],
})
export class AuthModule {}
