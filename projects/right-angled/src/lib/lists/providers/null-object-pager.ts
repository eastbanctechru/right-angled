import { Pager } from '../../core/pager';
import { ListResponse } from '../../core/list-response';

/**
 * Implements {@link Pager} contract and represents list without any paging mechanics.
 * @note This type is configured to use with {@link FiltersService}.
 */
export class NullObjectPager implements Pager {
    /**
     * @inheritdoc
     */
    public appendedOnLoad = false;

    /**
     * @inheritdoc
     */
    public totalCount = 0;
    /**
     * @inheritdoc
     */
    public loadedCount = 0;
    /**
     * @inheritdoc
     */
    public processResponse(response: ListResponse<any> | any[]): void {
        let alignedResponse: ListResponse<any>;
        if (Array.isArray(response)) {
            alignedResponse = {
                items: response,
                loadedCount: response.length,
                totalCount: response.length
            } as ListResponse<any>;
        } else {
            alignedResponse = response;
        }

        this.loadedCount = alignedResponse.loadedCount || (alignedResponse.items && alignedResponse.items.length ? alignedResponse.items.length : 0);
        this.totalCount = alignedResponse.totalCount || 0;
    }
    /**
     * @inheritdoc
     */
    public reset(): void {
        this.totalCount = 0;
        this.loadedCount = 0;
    }
}
