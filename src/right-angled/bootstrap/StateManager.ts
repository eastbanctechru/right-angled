export abstract class StateManager {
    public target: any;
    public abstract flushRequestState(state: Object): void;
    public abstract persistLocalState(state: Object): void;
    public abstract mergeStates(params: Object): Object;
}
