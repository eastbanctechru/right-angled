export abstract class RtStateManagementService {
    public serializationKey: string;
    public stateKey: any;
    public abstract flushRequestState(state: Object): void;
    public abstract persistLocalState(state: Object): void;
    public abstract mergeStates(): Object;
}
