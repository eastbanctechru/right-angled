import { Injectable } from "@angular/core";
import { SelectionEventsHelper } from "e2e4";
import { RTSelectionService } from "./selection-service";

@Injectable()
export class RTSelectionEventsHelper extends SelectionEventsHelper {
    public preventEventsDefaults: boolean = true;
    public stopEventsPropagation: boolean = true;
    constructor(selectionService: RTSelectionService) {
        super(selectionService);
        this.multiple = true;
    }
}
