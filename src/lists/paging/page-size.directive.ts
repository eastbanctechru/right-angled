import { Directive, KeyValueDiffers } from "@angular/core";
import { PagedPager } from "e2e4";

import { PagerInputBase } from "./pager-input-base";

@Directive({
    /* tslint:disable-next-line:directive-selector */
    selector: "input[rtPageSize]"
})
export class PageSizeDirective extends PagerInputBase {
    public get value(): number {
        return this.pager.pageSize;
    }
    public set value(value: number) {
        this.pager.pageSize = value;
    }
    constructor(pager: PagedPager, differs: KeyValueDiffers) {
        super(pager, differs, "pageSizeInternal");
    }
}
