import { filter } from '../../filters/filter.annotation';
import { SortParameter, SortDirection } from '../../core/sort-parameter';
import { FilterConfig } from '../../core/filter-config';
import { Injectable } from '@angular/core';

/**
 * Provides sorting functionality.
 * @note This type is configured to use with {@link FiltersService}.
 */
@Injectable()
export class RTSortingsService {
    /**
     * Sortings that were selected by the user and must be applied on next request of data.
     *
     * @note This property is ready to use with {@link FiltersService} since it has {@link filter} annotation.
     */
    @filter({
        defaultValue(this: RTSortingsService): SortParameter[] {
            return this.cloneDefaultSortings();
        },
        parameterName: 'sortings',
        parseFormatter(rawValue: any): object[] {
            return Array.isArray(rawValue)
                ? rawValue.map((sort: SortParameter) => ({
                      direction: sort.direction * 1,
                      fieldName: sort.fieldName
                  }))
                : [];
        },
        serializeFormatter(this: RTSortingsService): object {
            return this.sortings.map((sort: SortParameter) => ({
                direction: sort.direction,
                fieldName: sort.fieldName
            }));
        }
    } as FilterConfig)
    public sortings: SortParameter[] = new Array<SortParameter>();
    private defaultSortingsInternal: SortParameter[] = new Array<SortParameter>();
    /**
     * Default sortings that will be used by service.
     */
    public get defaultSortings(): SortParameter[] {
        return this.defaultSortingsInternal;
    }
    /**
     * If called when {@link sortings} is empty then applied value will be copied to {@link sortings} immediately.
     */
    public set defaultSortings(value: SortParameter[]) {
        this.defaultSortingsInternal = value || [];
        if (this.sortings.length === 0) {
            this.sortings = this.cloneDefaultSortings();
        }
    }
    /**
     * Sets {@link sortings} according to specified parameters.
     * @param fieldName name of the field by which sorting must be executed on server. This value will be used as {@link SortParameter.fieldName}.
     *
     * In case when sorting with the same field name is already specified, direction of this sorting will be toggled to reversed value and this sorting will be pushed to the end of {@link sortings} array.
     * So it will be applied last.
     * @param savePrevious `true` to keep previously applied sortings in {@link sortings} array.
     */
    public setSort(fieldName: string, savePrevious: boolean): void {
        let newSort = { direction: SortDirection.Asc, fieldName };
        for (let i = 0; i < this.sortings.length; i++) {
            if (this.sortings[i].fieldName === fieldName) {
                const existedSort = this.sortings.splice(i, 1)[0];
                newSort = {
                    direction: existedSort.direction,
                    fieldName: existedSort.fieldName
                };
                newSort.direction = newSort.direction === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc;
                break;
            }
        }
        if (savePrevious) {
            this.sortings.push(newSort);
        } else {
            this.sortings.length = 0;
            this.sortings.push(newSort);
        }
    }
    /**
     * Removes sort with specified field name  from {@link sortings} array.
     * @param fieldName name of the sort to remove.
     */
    public removeSort(fieldName: string): void {
        for (let i = 0; i < this.sortings.length; i++) {
            if (this.sortings[i].fieldName === fieldName) {
                this.sortings.splice(i, 1);
            }
        }
    }
    /**
     * Removes all sortings from {@link sortings} array.
     */
    public removeAllSortings(): void {
        this.sortings.length = 0;
    }
    /**
     * Performs service destroy.
     */
    public destroy(): void {
        this.defaultSortingsInternal.length = 0;
        this.sortings.length = 0;
    }
    /**
     * Internal method for default sortings cloning.
     * This method is used as {@link FilterConfig.defaultValue} as well as for copying to {@link sortings} when {@link defaultSortings} setter is used and {@link sortings} is empty.
     */
    private cloneDefaultSortings(): SortParameter[] {
        return this.defaultSortingsInternal.map((s: SortParameter) => ({
            direction: s.direction,
            fieldName: s.fieldName
        }));
    }
}
