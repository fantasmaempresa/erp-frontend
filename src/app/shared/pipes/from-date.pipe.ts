import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

@Pipe({
  name: 'fromDate',
})
export class FromDatePipe implements PipeTransform {
  transform(date: Date | string | undefined): string {
    if (typeof date === 'undefined') {
      return '';
    }

    return formatDistanceToNow(new Date(date), { locale: es, addSuffix: true });
  }
}
