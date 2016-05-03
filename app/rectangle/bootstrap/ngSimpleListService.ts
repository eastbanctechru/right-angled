import {ProgressState} from 'e2e4/src/common/progressState';
import {SortManager} from 'e2e4/src/SortManager';
import {ISortManager} from 'e2e4/src/contracts/ISortManager';
import {List} from 'e2e4/src/list';
import {SimplePager} from 'e2e4/src/simplePager';
import {NullObjectStateManager} from './NullObjectStateManager';

export class NgSimpleListService extends List {
    dataReadDelegate: (requestParams: any) => Promise<any>;
    sortManager: ISortManager;
    pager: SimplePager;
    constructor() {
        super(new NullObjectStateManager(), new SimplePager());
        (<NullObjectStateManager>this.stateManager).target = this;

        this.sortManager = new SortManager();
        this.filterManager.registerFilterTarget(this.sortManager);
        super.init({});
    }
    dispose(): void {
        this.sortManager.dispose();
        super.dispose();
    }
    wrap(target: any, dataReadDelegate: (requestParams: any) => Promise<any>): NgSimpleListService {
        this.dataReadDelegate = dataReadDelegate;
        this.filterManager.registerFilterTarget(target);
        return this;
    }
    getDataReadPromise(requestParams: any): Promise<Object> {
        return this.dataReadDelegate(requestParams);
    }
}
