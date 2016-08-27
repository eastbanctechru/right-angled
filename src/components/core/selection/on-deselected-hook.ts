import { SelectionItem } from 'e2e4';

export interface OnDeselected extends SelectionItem {
    /**
     * Опциональный хук-метод, который будет вызван реализациями контракта {@link SelectionService} при отмене выбора данного элемента.
     */
    rtOnDeselected?(): void;
}
