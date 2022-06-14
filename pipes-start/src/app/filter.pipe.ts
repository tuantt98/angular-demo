import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class PipePipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {

    if (value === undefined || value === null || value.length == 0) {
      return value;
    }

    const resultArray = [];
    for (let i = 0; i < value.length; i++) {
      const item = value[i]
      if (item[propName].toLowerCase().indexOf(filterString.toLowerCase()) !== -1) {
        resultArray.push(item);
      }
    }
    return resultArray
  }

}
