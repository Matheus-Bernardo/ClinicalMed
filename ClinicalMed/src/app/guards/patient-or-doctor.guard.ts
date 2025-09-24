import { of } from 'rxjs';
import { inject } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

export const patientORDoctorGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.getProfile().pipe(
     map(profile => {
      if (profile.authenticated && (profile.role === 'patient' || profile.role === 'doctor')) {
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
