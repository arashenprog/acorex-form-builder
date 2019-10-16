import { Component, OnInit } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';

@Component({
    template: `
        <ax-selection-list [direction]="direction" [mode]="mode" [selectedValues]="value" (selectedValuesChange)="handleValueChange($event)" [items]="items" [textField]="textField" [valueField]="valueField">
        </ax-selection-list>
    `,
})
export class AXFSelectionEditorComponent extends AXFProperyEditor<any[]> implements OnInit {


    items: any[] = [];
    textField:string = "title";
    valueField:string = "value";
    direction: "horizontal" | "vertical" = "horizontal";
    mode: "single" | "multiple" = "single";

    constructor() {
        super();
    }

    ngOnInit(): void { }
}
