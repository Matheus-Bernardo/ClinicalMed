import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

export const patientGuard: CanActivateFn = (route, state) => {
  console.log('⛔ patientGuard ATIVADO para rota', state.url);

  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.getProfile().pipe(
    tap(profile => {
      console.log('⛔ patientGuard: profile recebido', profile);
    }),
    map(profile => {
      if (profile.authenticated && profile.role === 'patient') {
        return true;
      } else {
        return router.createUrlTree(['/login']);
      }
    }),
    catchError(error => {
      console.error('⛔ patientGuard: erro', error);
      return of(router.createUrlTree(['/login']));
    })
  );
};

