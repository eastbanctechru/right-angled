import {NgListServiceBase} from './ngListServiceBase';
import {BufferedPager} from 'e2e4';


export class NgBufferedListService extends NgListServiceBase {
    pager: BufferedPager;
    constructor() {
        super(new BufferedPager());
    }
    wrap(target: any, dataReadDelegate: (requestParams: any) => Promise<any>): NgBufferedListService {
        super.wrap(target, dataReadDelegate);
        return this;
    }
}
