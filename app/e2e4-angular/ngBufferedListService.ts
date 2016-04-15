import {BufferedList} from 'e2e4/src/bufferedList';
import {NullObjectStateManager} from '../e2e4-angular/NullObjectStateManager';

export class NgBufferedListService extends BufferedList {
    dataReadDelegate: (requestParams: any) => Promise<any>;
    constructor() {
        super(new NullObjectStateManager());
        (<NullObjectStateManager>this.stateManager).target = this;
        super.init({});
    }
    getDataReadPromise(requestParams: any): Promise<Object> {
        return this.dataReadDelegate(requestParams);
    }
}
