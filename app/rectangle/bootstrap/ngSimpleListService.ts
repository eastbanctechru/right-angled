import {ProgressState} from 'e2e4/src/common/progressState';
import {SortManager} from 'e2e4/src/sortManager';
import {IStateManager} from './IStateManager';
import {ISortManager} from 'e2e4/src/contracts/ISortManager';
import {List} from 'e2e4/src/list';
import {SimplePager} from 'e2e4/src/simplePager';
import {NullObjectStateManager} from './nullObjectStateManager';
import {Utility} from 'e2e4/src/common/utility';

export class NgSimpleListService extends List {
    dataReadDelegate: (requestParams: any) => Promise<any>;
    sortManager: ISortManager;
    stateManager: IStateManager;
    pager: SimplePager;
    items: Object[];
    constructor() {
        super(new SimplePager());
        this.stateManager = new NullObjectStateManager();
        this.stateManager.target = this;

        this.sortManager = new SortManager();
        this.filterManager.registerFilterTarget(this.sortManager);
        const restoredState = this.stateManager.mergeStates({});
        super.init(restoredState);

    }
    clearData(): void {
        super.clearData();
        Utility.disposeAll(this.items);
    }
    loadData(): Promise<Object> {
        const promise = super.loadData.call(this, ...Array.prototype.slice.call(arguments));
        this.stateManager.flushRequestState(this.toRequest());
        this.stateManager.persistLocalState(this.getLocalState());
        return promise;
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
