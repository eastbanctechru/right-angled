import {NgListServiceBase} from './ngListServiceBase';
import {SimplePager} from 'e2e4';

export class NgListService extends NgListServiceBase {
    pager: SimplePager;
    constructor() {
        super(new SimplePager());
    }
    wrap(target: any, dataReadDelegate: (requestParams: any) => Promise<any>): NgListService {
        super.wrap(target, dataReadDelegate);
        return this;
    }
}
