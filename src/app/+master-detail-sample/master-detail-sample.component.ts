import { Component } from '@angular/core';
import { filter, PAGED_LIST_DIRECTIVES, PAGED_LIST_PROVIDERS, NgPagedListService } from '../../right-angled';

import { SHARED_DIRECTIVES, AirportsService } from '../shared';

@Component({
  directives: [SHARED_DIRECTIVES, PAGED_LIST_DIRECTIVES],
  moduleId: module.id,
  providers: [PAGED_LIST_PROVIDERS],
  templateUrl: 'master-detail-sample.component.html'
})
export class MasterDetailSampleComponent {
  @filter()
  public airportName: string;
  public airportsService: AirportsService;
  public ngPagedListService: NgPagedListService;
  public items: Array<any> = new Array<any>();
  constructor(airportsService: AirportsService, ngPagedListService: NgPagedListService) {
    this.airportsService = airportsService;
    this.ngPagedListService = ngPagedListService.wrap(this, this.loadData);
  }
  public loadData = (requestParams: any): Promise<any> => {
    return this.airportsService.getAirportsPaged(requestParams).then((result: any) => {
      this.items = result.items;
      return result;
    });
  };
}
