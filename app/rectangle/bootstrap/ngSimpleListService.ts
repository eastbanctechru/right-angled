import {NgListServiceBase} from './ngListServiceBase';
import {SimplePager} from 'e2e4';

export class NgSimpleListService extends NgListServiceBase {
    pager: SimplePager;
    constructor() {
        super(new SimplePager());
    }
    wrap(target: any, dataReadDelegate: (requestParams: any) => Promise<any>): NgSimpleListService {
        super.wrap(target, dataReadDelegate);
        return this;
    }
}
