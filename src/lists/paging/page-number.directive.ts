import { Directive, KeyValueDiffers } from "@angular/core";
import { PagedPager } from "e2e4";

import { PagerInputBase } from "./pager-input-base";

@Directive({
    /* tslint:disable-next-line:directive-selector */
    selector: "input[rtPageNumber]"
})
export class PageNumberDirective extends PagerInputBase {
    public get value(): number {
        return this.pager.pageNumber;
    }
    public set value(value: number) {
        this.pager.pageNumber = value;
    }
    constructor(pager: PagedPager, differs: KeyValueDiffers) {
        super(pager, differs, "pageNumberInternal");
    }
}
