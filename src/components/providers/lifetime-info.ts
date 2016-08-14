import { ProgressState } from 'e2e4';
import { Injectable } from '@angular/core';

@Injectable()
export class RtLifetimeInfo {
    /**
     * True if object was already destroyed via {@link destroy} call.  
     */
    public destroyed: boolean = false;
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
     * Выставляет свойство {@link destroyed} в true. Данный метод необходимо вызывать из классов-наследников при уничтожении.  
     */
    public destroy(): void {
        this.destroyed = true;
    }
}
