import { SortParameter } from './sort-parameter';
/**
 * Represents parameters of request to the server to retrieve list data.
 *
 * You can use this contract in your end-user code for better code completion.
 */
export interface ListRequest {
    /**
     * Sortings, which must be applied to the data.
     */
    sortings: SortParameter[];
}
