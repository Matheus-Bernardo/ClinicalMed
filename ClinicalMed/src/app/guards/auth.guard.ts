import { of } from 'rxjs';
import { inject } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  console.log('authGuard: ativado');

  return authService.getProfile().pipe(
    tap(profile => {
      console.log('authGuard: resposta do getProfile()', profile);
    }),
    map(profile => {
      if (profile.authenticated) {
        console.log('authGuard: usuário autenticado -> acesso permitido');
        return true;
      } else {
        console.log('authGuard: usuário não autenticado -> redirecionando para /login');
        return router.createUrlTree(['/login']);
      }
    }),
    catchError(error => {
      console.error('authGuard: erro ao buscar perfil', error);
      return of(router.createUrlTree(['/login']));
    })
  );
};
