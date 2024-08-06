import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'qualification',
  standalone: true
})
export class QualificationPipe implements PipeTransform {

  transform(value: string): any {
    const _value = Number(value);
    if(_value >= 80) {
      return '';
    }else if(_value >=60 && _value <=79){
      return 'warning';
    }else if(_value <= 59) {
      return 'danger';
    }
    return 'danger';
  }

}
