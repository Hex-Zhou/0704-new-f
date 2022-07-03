import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'humanPercent'
})
export class HumanPercentPipe implements PipeTransform {

  transform(value: number): number {
    value *= 100;
    return value % 10 ? value : value / 10;
  }

}
