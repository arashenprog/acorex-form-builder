import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';

@Component({
    template: `
    <ax-check-box [label]="label" [value]="value"  (change)="checkChange($event)"></ax-check-box>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFCheckboxEditorComponent extends AXFProperyEditor<boolean> implements OnInit {
 
    label:string;
    constructor(protected cdr: ChangeDetectorRef) {
        super();
    }

    ngOnInit(): void { 
    }


    checkChange(e)
    {
        this.handleValueChange(e.target.checked);
    }

}
