import { PipeTransform } from '@angular/core';
import { ListDirective } from './list.directive';
export declare class RowNumberPipe implements PipeTransform {
    transform(index: number, rtList: ListDirective): number;
}
