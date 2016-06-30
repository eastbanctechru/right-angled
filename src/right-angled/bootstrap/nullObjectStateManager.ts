import { IStateManager } from './IStateManager';
export class NullObjectStateManager implements IStateManager {
    public target: any;
    public flushRequestState(state: Object): void { return void (0); }
    public persistLocalState(state: Object): void { return void (0); }
    public mergeStates(params: Object): Object {
        return params;
    }
}
