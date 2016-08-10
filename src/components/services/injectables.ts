import { ProgressState, PagedPager, BufferedPager, RegularPager, SortingsService, FiltersService } from 'e2e4';
import { Injectable } from '@angular/core';

@Injectable()
export class RtPagedPager extends PagedPager {
    public tryMoveToFirstPage(): boolean {
        if (this.pageNumber > 1) {
            this.pageNumber = 1;
            return true;
        }
    }
    public tryMoveToPreviousPage(): boolean {
        if (this.pageNumber > 1) {
            this.pageNumber -= 1;
            return true;
        }
    }
    public tryMoveToNextPage(): boolean {
        if (this.pageNumber < this.pageCount) {
            this.pageNumber += 1;
            return true;
        }
    }
    public tryMoveToLastPage(): boolean {
        if (this.pageNumber < this.pageCount) {
            this.pageNumber = this.pageCount;
            return true;
        }
    }
}
@Injectable()
export class RtBufferedPager extends BufferedPager { }
@Injectable()
export class RtRegularPager extends RegularPager { }
@Injectable()
export class RtSortingsService extends SortingsService { }
@Injectable()
export class RtFiltersService extends FiltersService { }
@Injectable()
export class RtListLifetimeInfo {
    /**
     * True if object was already disposed via {@link dispose} call.  
     */
    public disposed: boolean = false;
    /**
     * True if object was already inited via {@link init} call.  
     */
    public inited: boolean = false;
    /**
     * Текущее состояние объекта.  
     */
    public state: ProgressState = ProgressState.Initial;
    /**
     * Вычисляемое свойство, указывающее что текущее состояние {@link AbstractLifetime.state} равно {@link ProgressState.Progress}.
     * Реализовано для удобства использования в шаблонах.  
     */
    public get busy(): boolean {
        return this.state === ProgressState.Progress;
    }
    /**
     * Вычисляемое свойство, указывающее что текущее состояние {@link AbstractLifetime.state} НЕ равно {@link ProgressState.Progress}.
     * Реализовано для удобства использования в шаблонах.  
     */
    public get ready(): boolean {
        return this.state !== ProgressState.Progress;
    }
    /**
     * Выставляет свойство {@link inited} в true. Данный метод необходимо вызывать из классов-наследников после инициализации.  
     */
    public init(): void {
        this.inited = true;
    }
    /**
     * Выставляет свойство {@link disposed} в true. Данный метод необходимо вызывать из классов-наследников при уничтожении.  
     */
    public dispose(): void {
        this.disposed = true;
    }
}
