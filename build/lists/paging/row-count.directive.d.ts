import { KeyValueDiffers } from '@angular/core';
import { BufferedPager } from 'e2e4';
import { PagerInputBase } from './pager-input-base';
export declare class RowCountDirective extends PagerInputBase {
    value: number;
    constructor(bufferedPager: BufferedPager, differs: KeyValueDiffers);
}
