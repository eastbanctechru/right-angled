export abstract class NgStateManagementService {
    public serializationKey: string;
    public target: any;
    public abstract flushRequestState(state: Object): void;
    public abstract persistLocalState(state: Object): void;
    public abstract mergeStates(): Object;
}
