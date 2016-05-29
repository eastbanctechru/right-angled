export interface IStateManager {
    target: any;
    flushRequestState(state: Object): void;
    persistLocalState(state: Object): void;
    mergeStates(params: Object): Object;
}
