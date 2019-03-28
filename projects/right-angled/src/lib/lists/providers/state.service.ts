import { RTFiltersService } from '../../filters/filters.service';

/**
 * Base contract for state management services.
 */
export abstract class RTStateService {
    /**
     * This method must get required state from passed filterService instance and persist it in any way.
     * @param filtersService service to request state.
     */
    public abstract persistState(filtersService: RTFiltersService): void;
    /**
     * This method will be called during {@link RTList} initialization and must return settings saved previously.
     */
    public abstract getState(): any;
}
