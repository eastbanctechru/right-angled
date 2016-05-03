import {ISortManager} from 'e2e4/src/contracts/ISortManager';
import {SortManager} from 'e2e4/src/sortManager';
import {List} from 'e2e4/src/list';
import {BufferedPager} from 'e2e4/src/bufferedPager';
import {NullObjectStateManager} from './nullObjectStateManager';

export class NgBufferedListService extends List {
    dataReadDelegate: (requestParams: any) => Promise<any>;
    sortManager: ISortManager;
    pager: BufferedPager;
    constructor() {
        super(new NullObjectStateManager(), new BufferedPager());
        (<NullObjectStateManager>this.stateManager).target = this;

        this.sortManager = new SortManager();
        this.filterManager.registerFilterTarget(this.sortManager);
        super.init({});
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
    getDataReadPromise(requestParams: any): Promise<Object> {
        return this.dataReadDelegate(requestParams);
    }
}
