import { ListRequest } from './list-request';
/**
 * Represents parameters of request to the server to retrieve list data.
 *
 * You can use this contract in your end-user code for better code completion.
 */
export interface PagedListRequest extends ListRequest {
    /**
     * Number of items already loaded to the list that must be skipped on next request.
     */
    skip: number;
    /**
     * Number of items that must be loaded on next request.
     */
    take: number;
}
