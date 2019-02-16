import { KeyValueDiffers } from '@angular/core';
import { PagedPager } from 'e2e4';
import { PagerInputBase } from './pager-input-base';
export declare class PageNumberDirective extends PagerInputBase {
    value: number;
    constructor(pager: PagedPager, differs: KeyValueDiffers);
}
