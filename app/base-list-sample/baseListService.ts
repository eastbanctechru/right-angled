import * as _ from 'lodash';
import {SortDirection} from 'e2e4/src/common/sortDirection';

export class ListComponentService {
    items = [
        {
            id: 1,
            title: 'one'
        },
        {
            id: 2,
            title: 'two'
        },
        {
            id: 3,
            title: 'three'
        },
        {
            id: 4,
            title: 'four'
        },
        {
            id: 5,
            title: 'five'
        },
        {
            id: 5,
            title: 'one'
        },
        {
            id: 4,
            title: 'two'
        },
        {
            id: 3,
            title: 'three'
        },
        {
            id: 2,
            title: 'four'
        },
        {
            id: 1,
            title: 'five'
        }
    ];
    getData(request: any): Promise<any> {
        return new Promise(
            (resolve) => {
                setTimeout(() => {
                    let fieldNames = request.sort.map((sort) => { return sort.fieldName; });
                    let directions = request.sort.map((sort) => { return sort.direction === SortDirection.Asc ? 'asc' : 'desc'; });

                    let data = _.orderBy(this.items, fieldNames, directions);


                    let res: any = {
                        items: data,
                        loadedCount: data.length,
                        totalCount: this.items.length
                    };
                    resolve(res);
                }, 0);
            });
    }
}
