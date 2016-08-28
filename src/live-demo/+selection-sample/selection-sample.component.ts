import { Component } from '@angular/core';

import { AirportsBufferedListRequest, AirportsService, SHARED_DIRECTIVES } from '../shared';

@Component({
    directives: [SHARED_DIRECTIVES],
    moduleId: module.id,
    templateUrl: 'selection-sample.component.html'
})
export class SelectionSampleComponent {
    public IMPORT_CODE_TS: string = `
    import { RTSelectionModule } from 'right-angled';
    @NgModule({
        bootstrap: [AppComponent],
        declarations: [AppComponent],
        imports: [...RTSelectionModule...]
    })
    export class AppModule {}
`;
    constructor(public airportsService: AirportsService) {
    }

    public loadData = (requestParams: AirportsBufferedListRequest): any => {
        return this.airportsService.getAirportsBuffered(requestParams);
    };
}
