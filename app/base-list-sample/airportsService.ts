import {Injectable} from 'angular2/core';
import {airports}     from '../airports';
import * as _ from 'lodash';
import {SortDirection} from 'e2e4/src/common/sortDirection';

@Injectable()
export class AirportsService {
  getAirports(request: any): Promise<any> {
      let fieldNames = request.sort.map((sort) => { return sort.fieldName; });
      let directions = request.sort.map((sort) => { return sort.direction === SortDirection.Asc ? 'asc' : 'desc'; });
      let data = _.orderBy(airports, fieldNames, directions);
      let result: any = {
                        items: data,
                        loadedCount: data.length,
                        totalCount: airports.length
                    };
    return Promise.resolve(result);
  }
}
