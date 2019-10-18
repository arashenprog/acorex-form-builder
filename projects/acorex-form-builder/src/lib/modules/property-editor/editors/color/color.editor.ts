import { Component, OnInit } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';

@Component({
    template: `
        <ax-color-picker  [value]="value" (valueChange)="handleValueChange($event)" >
        </ax-color-picker>
    `,
})
export class AXFColorEditorComponent extends AXFProperyEditor<string> implements OnInit {



    constructor() {
        super();
    }

    ngOnInit(): void { 
    }
}
