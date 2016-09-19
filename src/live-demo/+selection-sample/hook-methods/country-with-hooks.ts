import { OnDeselected, OnSelected, OnSelectionChanged } from 'right-angled';

export class CountryWithHooks implements OnSelected, OnDeselected, OnSelectionChanged {
    public selected: boolean = false;
    constructor(public name: string) {
        this.name = name;
    }
    public rtOnSelected(): void {
        alertify.log(`${this.name} - selected`);
    }
    public rtOnDeselected(): void {
        alertify.log(`${this.name} - deselected`);
    }
    public rtOnSelectionChanged(selected: boolean): void {
        alertify.log(`${this.name} - selected state changed to ${selected}`);
    }
}