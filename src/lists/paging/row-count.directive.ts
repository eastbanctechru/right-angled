import { Directive, KeyValueDiffers } from "@angular/core";
import { BufferedPager } from "e2e4";

import { PagerInputBase } from "./pager-input-base";

@Directive({
    /* tslint:disable-next-line:directive-selector */
    selector: "input[rtRowCount]"
})
export class RowCountDirective extends PagerInputBase {
    public get value(): number {
        return this.pager.takeRowCount;
    }
    public set value(value: number) {
        this.pager.takeRowCount = value;
    }
    constructor(bufferedPager: BufferedPager, differs: KeyValueDiffers) {
        super(bufferedPager, differs, "takeRowCountInternal");
    }
}
