import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusLabel'
})
export class StatusLabelPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'PENDING': return 'Pendente';
      case 'CONFIRMED': return 'Confirmada';
      case 'CANCELED': return 'Cancelada';
      default: return value;
    }
  }

}
