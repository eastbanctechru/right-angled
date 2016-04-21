import {ProgressState} from 'e2e4/src/common/progressState';
import {List} from 'e2e4/src/list';
import {NullObjectStateManager} from '../e2e4-angular/NullObjectStateManager';

export class NgListService extends List {
    dataReadDelegate: (requestParams: any) => Promise<any>;
    constructor() {
        super(new NullObjectStateManager());
        (<NullObjectStateManager>this.stateManager).target = this;
        super.init({});
    }
    wrap(target: any, dataReadDelegate: (requestParams: any) => Promise<any>): NgListService {
        this.dataReadDelegate = dataReadDelegate;
        this.filterManager.registerFilterTarget(target);
        return this;
    }
    getDataReadPromise(requestParams: any): Promise<Object> {
        return this.dataReadDelegate(requestParams);
    }
}
