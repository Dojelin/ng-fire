import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

export const routingGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> | Promise<boolean> | boolean => {
  const router: Router = inject(Router);
  const auth: AuthService = inject(AuthService);

  if (!auth.authenticated) {
    console.log('Not autorized');
    return router.navigate(['/signin']);
  }
  console.log('You ar welcome');
  return true;
};
