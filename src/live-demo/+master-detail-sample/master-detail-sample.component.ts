import { Component } from '@angular/core';

import { AirportsPagedListRequest, AirportsService } from '../shared';

@Component({
  templateUrl: 'master-detail-sample.component.html'
})
export class MasterDetailSampleComponent {
  constructor(public airportsService: AirportsService) {
  }
  public loadData = (requestParams: AirportsPagedListRequest): any => {
    return this.airportsService.getAirportsPaged(requestParams);
  };
}
