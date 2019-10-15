import { Component, OnInit } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';

@Component({
    template: `
        <ax-selection-list [direction]="direction" [mode]="mode" [selectedItems]="value" [items]="items" [textField]="textField">
        </ax-selection-list>
    `,
})
export class AXFSelectionEditorComponent extends AXFProperyEditor<any[]> implements OnInit {


    items: any[] = [];
    textField:string = "title";
    direction: "horizontal" | "vertical" = "horizontal";
    mode: "single" | "multiple" = "single";

    constructor() {
        super();
    }

    ngOnInit(): void { }
}
