/**
 * Represents sort direction that applied as parameter by {@link SortParameter} class.
 */
export enum SortDirection {
    /**
     * Ascending sort order.
     */
    Asc = 0,
    /**
     * Descending sort order.
     */
    Desc = 1
}

/**
 * Represents sorting parameter applied to the server request by {@link RTSortingsService}.
 */
export interface SortParameter {
    /**
     * Sort direction.
     */
    direction: SortDirection;
    /**
     * Name of the field by which sorting must be performed.
     */
    fieldName: string;
}
