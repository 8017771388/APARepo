import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'booleanfilter'
})
export class BooleanFilterPipe implements PipeTransform {
    transform(items: any[], searchText: string, key: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText && typeof searchText !== 'boolean') {
            return items;
        }

        return items.filter(it => {
            if (typeof it[key] === 'boolean') {
                if (it[key] === searchText) {
                    return true;
                }
                return false;
            }
        });
    }
}
