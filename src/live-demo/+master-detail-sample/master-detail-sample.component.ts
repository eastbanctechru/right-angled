import { Component } from '@angular/core';

import { SHARED_DIRECTIVES, AirportsService, AirportsPagedListRequest } from '../shared';

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
