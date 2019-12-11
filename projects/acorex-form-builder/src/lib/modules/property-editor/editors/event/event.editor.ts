import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';

@Component({
    template: `
        <ax-text-box (textChange)="handleValueChange($event)" [text]="value">
        </ax-text-box>
    `,
})
export class AXFEventEditorComponent extends AXFProperyEditor<string>  {

    constructor(protected cdr: ChangeDetectorRef) {
        super();
    }


    handleValueChange(value: any) {
        super.handleValueChange(value);
    }
}
