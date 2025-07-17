import { of } from 'rxjs';
import { inject } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  console.log('authGuard: ativado');

  return authService.getProfile().pipe(
     map(profile => {
      if (profile.authenticated) {
        return true;
      } else {
        return router.createUrlTree(['/login']);
      }
    }),
    catchError(error => {
      return of(router.createUrlTree(['/login']));
    })
  );
};
