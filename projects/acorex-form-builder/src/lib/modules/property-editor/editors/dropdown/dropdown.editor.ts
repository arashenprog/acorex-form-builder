import { Component, OnInit } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';

@Component({
    template: `
        <ax-select-box  [allowSearch]="false" [selectedValues]="innerValue" (selectedValuesChange)="handleValueChange($event)" [items]="items" [textField]="textField" [valueField]="valueField">
        </ax-select-box>
    `,
})
export class AXFDropdownEditorComponent extends AXFProperyEditor<any[]> implements OnInit {

    innerValue: any[] = [];
    items: any[] = [];
    textField: string = "title";
    valueField: string = "value";

    constructor() {
        super();
    }

    ngOnInit(): void {
        this.innerValue = this.value;
    }
}
