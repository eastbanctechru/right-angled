import { NgListServiceBase } from './ngListServiceBase';
import { SimplePager } from 'e2e4';

export class NgListService extends NgListServiceBase {
    public pager: SimplePager;
    constructor() {
        super(new SimplePager());
    }
    public wrap(target: any, dataReadDelegate: (requestParams: any) => Promise<any>): NgListService {
        super.wrap(target, dataReadDelegate);
        return this;
    }
}
