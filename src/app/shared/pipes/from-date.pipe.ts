import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

@Pipe({
  name: 'fromDate',
})
export class FromDatePipe implements PipeTransform {
  transform(_date: Date | string | undefined): string {
    if (typeof _date === 'undefined') {
      return '';
    }

    return formatDistanceToNow(new Date(_date), { locale: es });
  }
}
