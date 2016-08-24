import { FiltersService } from 'e2e4';
export interface RtPersistenceService {
    persistState(filtersService: FiltersService): void;
    getPersistedState(): any;
}
