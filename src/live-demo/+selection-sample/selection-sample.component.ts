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
    public HOW_TO_USE_TS: string;
    constructor(http: Http) {
        this.BASIC_USAGE_TS =
            http.get('https://raw.githubusercontent.com/fshchudlo/right-angled/master/src/live-demo/%2Bselection-sample/basic-usage/basic-usage.component.ts')
                .map(res => {
                    return typeof PR !== 'undefined' ? PR.prettyPrintOne(res.text(), 'js') : 'Prettyprint is broken for samo reason.';
                });
        this.HOW_TO_USE_TS = typeof PR !== 'undefined' ? PR.prettyPrintOne(`
    import { RTSelectionModule } from 'right-angled';
    @NgModule({
        bootstrap: [AppComponent],
        declarations: [AppComponent],
        imports: [...RTSelectionModule...]
    })
    export class AppModule {}`, 'js') : 'Prettyprint is broken for samo reason.';
    }
}
