import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideRouter } from '@angular/router';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { withEventReplay, provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideToastr({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    importProvidersFrom(
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: () => adapterFactory(), 
      })
    ),
    { provide: 'LOCALE_ID', useValue: 'pt-BR' },
  ],
};
