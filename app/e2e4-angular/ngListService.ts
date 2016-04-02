import {ProgressState} from 'e2e4/src/common/progressState';
import {ListComponent} from 'e2e4/src/listComponent';
import {NullObjectStateManager} from '../e2e4-angular/NullObjectStateManager';

export class NgListService extends ListComponent {
    normalizedService: NgListService;
    dataReadDelegate: () => Promise<any>;
    constructor() {
        super(new NullObjectStateManager());
        (<NullObjectStateManager>this.stateManager).target = this;
        super.init({});
    }
    getDataReadPromise(): Promise<Object> {
        if (!this.inited) {
            throw new Error(`Activation lifecycle hook must be called for listComponent before usage of AureliaListComponent. 
            And don't forget to call dispose method on deactivation lifecycle!`);
        }
        return this.dataReadDelegate();
    }
}
