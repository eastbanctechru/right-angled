export abstract class NgStateManagementService {
    public target: any;
    public abstract flushRequestState(state: Object): void;
    public abstract persistLocalState(state: Object): void;
    public abstract mergeStates(): Object;
}
