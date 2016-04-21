import {PagedList} from 'e2e4/src/pagedList';
import {NullObjectStateManager} from '../e2e4-angular/NullObjectStateManager';

export class NgPagedListService extends PagedList {
    dataReadDelegate: (requestParams: any) => Promise<any>;
    constructor() {
        super(new NullObjectStateManager());
        (<NullObjectStateManager>this.stateManager).target = this;
        super.init({});
    }
    wrap(target: any, dataReadDelegate: (requestParams: any) => Promise<any>): NgPagedListService {
        this.dataReadDelegate = dataReadDelegate;
        this.filterManager.registerFilterTarget(target);
        return this;
    }
    getDataReadPromise(requestParams: any): Promise<Object> {
        return this.dataReadDelegate(requestParams);
    }
}
