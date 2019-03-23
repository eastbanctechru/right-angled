import { Pipe, PipeTransform } from '@angular/core';
import { ListDirective } from './list.directive';
import { RTPagedPager } from './providers/paged-pager';

@Pipe({ name: 'rtRowNumber' })
export class RowNumberPipe implements PipeTransform {
    public transform(index: number, rtList: ListDirective): number {
        if (index !== 0 && (!index || isNaN(index))) {
            throw new Error('Invalid input value for rtRowNumber pipe. Must be a valid numeric value.');
        }
        if (!rtList) {
            throw new Error('Invalid value provided for parameter "rtList" of rtRowNumber pipe . Must be "rtList" directive instance.');
        }
        if (rtList.listService.pager !== null && (rtList.listService.pager as RTPagedPager).displayFrom) {
            return index + (rtList.listService.pager as RTPagedPager).displayFrom;
        } else {
            return index + 1;
        }
    }
}
