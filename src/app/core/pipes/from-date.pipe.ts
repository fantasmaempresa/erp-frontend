import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'fromDate',
})
export class FromDatePipe implements PipeTransform {
  transform(_date: Date | undefined): string {
    if (typeof _date === 'undefined') {
      return '';
    }
    const m = moment(_date).locale('es');
    return m.fromNow();
  }
}
