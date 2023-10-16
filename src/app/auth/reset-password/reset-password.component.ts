import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../auth.style.css'],
})
export class ResetPasswordComponent {
  email: string;

  constructor(private auth: AuthService, private router: Router) {}

  resetPassword() {
    return this.auth
      .resetPassword(this.email)
      .then(() => this.router.navigate(['/signin']));
  }
}
