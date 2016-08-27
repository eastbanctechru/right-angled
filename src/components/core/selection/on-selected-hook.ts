import { SelectionItem } from 'e2e4';

export interface OnSelected extends SelectionItem {
    /**
     * Опциональный хук-метод, который будет вызван реализациями контракта {@link SelectionService} при выборе данного элемента.
     */
    rtOnSelected(): void;
}
