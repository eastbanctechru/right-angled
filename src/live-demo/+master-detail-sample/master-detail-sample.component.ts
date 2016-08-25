import { Component } from '@angular/core';

import { AirportsPagedListRequest, AirportsService, SHARED_DIRECTIVES } from '../shared';

@Component({
  directives: [SHARED_DIRECTIVES],
  moduleId: module.id,
  templateUrl: 'master-detail-sample.component.html'
})
export class MasterDetailSampleComponent {
  constructor(public airportsService: AirportsService) {
  }
  public loadData = (requestParams: AirportsPagedListRequest): any => {
    return this.airportsService.getAirportsPaged(requestParams);
  };
}
