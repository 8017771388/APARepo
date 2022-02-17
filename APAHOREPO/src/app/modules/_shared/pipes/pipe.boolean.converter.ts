import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
    name:'BooleanConverter'
})

export class BooleanConverterpipe implements PipeTransform {
    transform(value:boolean){
        if(value===true){
            let bool='Yes';
            return bool;
        }
        if(value===false){
            let bool='No';
            return bool;
        }
    }

}