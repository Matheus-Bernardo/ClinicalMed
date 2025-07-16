import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

export const doctorGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  console.log('doctorGuard: ativado para', state.url);


  console.log('doctorGuard: ativado');

  return authService.getProfile().pipe(
    tap(profile => {
      console.log('doctorGuard: resposta do getProfile()', profile);
    }),
    map(profile => {
      if (profile.authenticated && profile.role === 'doctor') {
        console.log('doctorGuard: usuário autenticado como doctor -> acesso permitido');
        return true;
      } else {
        console.log('doctorGuard: acesso negado, redirecionando para /login');
        return router.createUrlTree(['/login']);
      }
    }),
    catchError(error => {
      console.error('doctorGuard: erro ao buscar perfil', error);
      return of(router.createUrlTree(['/login']));
    })
  );
};
