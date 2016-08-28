import { Component } from '@angular/core';

import { BasicUsageComponent } from './basic-usage/basic-usage.component';

@Component({
    directives: [BasicUsageComponent],
    moduleId: module.id,
    templateUrl: 'selection-sample.component.html'
})
export class SelectionSampleComponent {
    public HOW_TO_USE_TS: string = `
    import { RTSelectionModule } from 'right-angled';
    @NgModule({
        bootstrap: [AppComponent],
        declarations: [AppComponent],
        imports: [...RTSelectionModule...]
    })
    export class AppModule {}
`;
}
