import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

@Pipe({
  name: 'mapTo',
})
export class MapToPipe implements PipeTransform {
  transform(
    value: any,
    mapTo: (value: any, parameters?: any) => any,
    ...args: any[]
  ): any | Observable<any> {
    return mapTo(value, args);
  }
}
