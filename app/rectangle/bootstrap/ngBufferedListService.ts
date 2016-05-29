import {ISortManager} from 'e2e4/src/contracts/ISortManager';
import {IStateManager} from './IStateManager';
import {SortManager} from 'e2e4/src/sortManager';
import {List} from 'e2e4/src/list';
import {BufferedPager} from 'e2e4/src/bufferedPager';
import {NullObjectStateManager} from './nullObjectStateManager';
import {Utility} from 'e2e4/src/common/utility';

export class NgBufferedListService extends List {
    dataReadDelegate: (requestParams: any) => Promise<any>;
    sortManager: ISortManager;
    stateManager: IStateManager;
    pager: BufferedPager;
    items: Object[];
    constructor() {
        super(new BufferedPager());
        this.stateManager = new NullObjectStateManager()
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
    dispose(): void {
        this.sortManager.dispose();
        super.dispose();
    }
    wrap(target: any, dataReadDelegate: (requestParams: any) => Promise<any>): NgBufferedListService {
        this.dataReadDelegate = dataReadDelegate;
        this.filterManager.registerFilterTarget(target);
        return this;
    }
    loadData(): Promise<Object> {
        const promise = super.loadData();
        this.stateManager.flushRequestState(this.toRequest());
        this.stateManager.persistLocalState(this.getLocalState());
        return promise;
    }
    getDataReadPromise(requestParams: any): Promise<Object> {
        return this.dataReadDelegate(requestParams);
    }
}
