import {PagedListComponent} from 'e2e4/src/pagedListComponent';
import {NullObjectStateManager} from '../e2e4-angular/NullObjectStateManager';

export class NgPagedListService extends PagedListComponent {
    normalizedService: NgPagedListService;
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
