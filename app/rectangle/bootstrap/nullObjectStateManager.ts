import {IStateManager} from 'e2e4/src/contracts/IStateManager';
export class NullObjectStateManager implements IStateManager {
    target: any;
    flushRequestState(state: Object): void {

    }
    persistLocalState(state: Object): void { }
    mergeStates(params: Object): Object {
        return params;
    }
}
