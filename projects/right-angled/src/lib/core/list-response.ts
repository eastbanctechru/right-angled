import { OperationStatus } from './operation-status';
/**
 * Represents server response which is returned on list data request.
 *
 * You can use this contract in your end-user code for better code completion.
 */

export interface ListResponse<TItem> {
    /**
     * Returned collection of records.
     */
    items: TItem[];
    /**
     * Total count of records in remote data source.
     * This property is used by pagers (e.g. to calculate total pages count in ({@link RTPagedPager}) and can be used to display total records count on UI.
     */
    totalCount: number;
    /**
     * Count of records that was loaded at last request.
     *
     * Typically it's equal to `items.length` value. But it can differ for grouped lists, for example, so it's placed to a separate property.
     */
    loadedCount?: number;

    /**
     * Optional value of type {@link OperationStatus}.
     *
     * If value of this field is presented, response evaluated by {@link RTList} as intermediate.
     *
     * This field can be used to perform data loading using async actions with tools like redux or ngrx.
     *
     * Usually, start action returns response of this type with `status` field equal to {@link OperationStatus.Progress}
     *
     * Later, when data loading is completed, regular {@link ListResponse<TItem>} can be passed via same stream to complete loading operation.
     */
    status?: OperationStatus;
}
