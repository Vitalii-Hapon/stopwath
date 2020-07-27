import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: number): string {
    const H = Math.floor(value / 3600);
    const M = Math.floor(value / 60) - H * 60;
    const S = value % 60;

    function add0(timeValue: number): string {
      if (timeValue < 10) {
        return '0' + timeValue;
      } else {
        return `${timeValue}`;
      }
    }
    return `${add0(H)} : ${add0(M)} : ${add0(S)}`;
  }
}
