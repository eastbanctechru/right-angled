import { FiltersService } from 'e2e4';
export abstract class RtStateService {
    public abstract persistState(filtersService: FiltersService): void;
    public abstract getPersistedState(): any;
}
