import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dueDate'
})
export class DueDatePipe implements PipeTransform {

  transform(items: any[], filter: any): any {
    if(filter === null){
      return items.filter(item => item.dueDate === filter);
    }
    else{
      return items.filter(item => item.dueDate !== null);
    }   
  }

}
