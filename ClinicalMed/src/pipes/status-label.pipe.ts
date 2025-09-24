import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusLabel'
})
export class StatusLabelPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'PENDING': return 'Pendente';
      case 'DONE': return 'Realizada';
      case 'CANCELED': return 'Cancelada';
      default: return value;
    }
  }

}
