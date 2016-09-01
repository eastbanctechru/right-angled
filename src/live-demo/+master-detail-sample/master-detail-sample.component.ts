import { Component } from '@angular/core';

import { AirportsPagedListRequest, AirportsService } from '../shared';

@Component({
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
