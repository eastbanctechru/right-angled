export enum SortDirection {
    Asc = 0,
    Desc = 1
}

export interface SortParameter {
    direction: SortDirection;
    fieldName: string;
}
