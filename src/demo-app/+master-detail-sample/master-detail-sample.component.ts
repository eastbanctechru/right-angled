import { Component } from '@angular/core';
import { PAGED_LIST_DIRECTIVES, PAGED_LIST_PROVIDERS } from 'right-angled';

import { SHARED_DIRECTIVES, AirportsService } from '../shared';

@Component({
  directives: [SHARED_DIRECTIVES, PAGED_LIST_DIRECTIVES],
  moduleId: module.id,
  providers: [PAGED_LIST_PROVIDERS],
  templateUrl: 'master-detail-sample.component.html'
})
export class MasterDetailSampleComponent {
  public items: Array<any> = new Array<any>();
  constructor(public airportsService: AirportsService) {
  }
  public loadData = (requestParams: any): Promise<any> => {
    return this.airportsService.getAirportsPaged(requestParams).then((result: any) => {
      this.items = result.items;
      return result;
    });
  };
}
