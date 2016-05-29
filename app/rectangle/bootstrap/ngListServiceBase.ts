import {AbstractLifetime} from 'e2e4/src/abstractLifetime';
import {IPager} from 'e2e4/src/contracts/IPager';
import {ProgressState} from 'e2e4/src/common/progressState';

export abstract class NgListServiceBase extends AbstractLifetime {
    private listLoadDataSuccessCallback(result: Object): Object {
        this.pager.processResponse(result);
        this.state = ProgressState.Done;
        // In case when filter changed from last request and theres no data now
        if (this.pager.totalCount === 0) {
            this.clearData();
        }
        return result;
    }
    private listLoadDataFailCallback(): void {
        this.state = ProgressState.Fail;
    }
    private listLoadDataSuccessBinded: (result: Object) => Object;
    private listLoadDataFailBinded: (error: Object) => void;

    constructor(pager: IPager) {
        super();
        this.pager = pager;
        this.listLoadDataSuccessBinded = this.listLoadDataSuccessCallback.bind(this);
        this.listLoadDataFailBinded = this.listLoadDataFailCallback.bind(this);
    }
    dispose(): void {
        super.dispose();
        delete this.listLoadDataSuccessBinded;
        delete this.listLoadDataFailBinded;
        this.clearData();
    }
    clearData(): void {
        this.pager.reset();
    }

    loadData(): Promise<Object> {
        if (!this.inited) {
            throw new Error('loadData can be called only after activation.');
        }
        this.pager.totalCount = 0;
        this.state = ProgressState.Progress;
        const promise = this.getDataReadPromise();
        this.addToCancellationSequence(promise);
        promise.then(this.listLoadDataSuccessBinded, this.listLoadDataFailBinded);
        return promise;
    }
    reloadData(): void {
        if (this.ready) {
            this.clearData();
            this.loadData();
        }
    }
    addToCancellationSequence(promise: Promise<Object>): void { };
    cancelRequests(): void { };
    pager: IPager;
    abstract getDataReadPromise(): Promise<Object>;



}