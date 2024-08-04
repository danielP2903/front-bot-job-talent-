import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'qualification',
  standalone: true
})
export class QualificationPipe implements PipeTransform {

  transform(value: string): any {
    console.log(value);

    const _value = Number(value);
    if(_value >= 80) {
      console.log('suc');

      return '';
    }else if(_value >=60 && _value <=79){
      console.log('war');
      return 'warning';
    }else if(_value <= 59) {
      console.log('dang');

      return 'danger';
    }
    return 'danger';
  }

}
