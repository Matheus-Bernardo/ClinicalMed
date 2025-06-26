
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


export const CALENDAR_PROVIDERS = [
    { provide: DateAdapter, useFactory: adapterFactory }
];