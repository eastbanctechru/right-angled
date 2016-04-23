import {ISortManager} from 'e2e4/src/contracts/ISortManager';
import {SortManager} from 'e2e4/src/sortManager';
import {BufferedList} from 'e2e4/src/bufferedList';
import {NullObjectStateManager} from './nullObjectStateManager';

export class NgBufferedListService extends BufferedList {
    dataReadDelegate: (requestParams: any) => Promise<any>;
    sortManager: ISortManager;
    constructor() {
        super(new NullObjectStateManager());
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
