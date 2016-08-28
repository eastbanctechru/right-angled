import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { BasicUsageComponent } from './basic-usage/basic-usage.component';

@Component({
    directives: [BasicUsageComponent],
    moduleId: module.id,
    templateUrl: 'selection-sample.component.html'
})
export class SelectionSampleComponent {
    public BASIC_USAGE_TS: any;
    public HOW_TO_USE_TS: any;
    constructor(http: Http) {
        const baseUrl = 'https://raw.githubusercontent.com/fshchudlo/right-angled/master/';

        this.BASIC_USAGE_TS =
            http.get(baseUrl + 'src/live-demo/%2Bselection-sample/basic-usage/basic-usage.component.ts')
                .map(res => {
                    return typeof PR !== 'undefined' ? PR.prettyPrintOne(res.text(), 'js') : 'Prettyprint is broken for some reason.';
                });
        this.HOW_TO_USE_TS = http.get(baseUrl + 'demo-stubs/selection-bootstrap/app.module.ts')
            .map(res => {
                return typeof PR !== 'undefined' ? PR.prettyPrintOne(res.text(), 'js') : 'Prettyprint is broken for some reason.';
            });
    }
}
