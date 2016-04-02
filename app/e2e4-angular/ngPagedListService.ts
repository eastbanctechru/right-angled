import {PagedList} from 'e2e4/src/pagedList';
import {NullObjectStateManager} from '../e2e4-angular/NullObjectStateManager';

export class NgPagedListService extends PagedList {
    normalizedService: NgPagedListService;
    dataReadDelegate: () => Promise<any>;
    constructor() {
        super(new NullObjectStateManager());
        (<NullObjectStateManager>this.stateManager).target = this;
        super.init({});
    }
    getDataReadPromise(): Promise<Object> {
        return this.dataReadDelegate();
    }
}
