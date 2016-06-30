import { NgListServiceBase } from './ngListServiceBase';
import { BufferedPager } from 'e2e4';


export class NgBufferedListService extends NgListServiceBase {
    public pager: BufferedPager;
    constructor() {
        super(new BufferedPager());
    }
    public wrap(target: any, dataReadDelegate: (requestParams: any) => Promise<any>): NgBufferedListService {
        super.wrap(target, dataReadDelegate);
        return this;
    }
}
