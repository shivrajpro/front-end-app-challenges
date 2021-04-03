import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFilterPipe'
})
export class NameFilterPipePipe implements PipeTransform {

  transform(values: any[], name: string): any {
    if (!values || !name) {
      return values;
    }

    return values.filter((item) => {

      return item.Brand.toLowerCase().includes(name.toLowerCase())
    });
  }

}
