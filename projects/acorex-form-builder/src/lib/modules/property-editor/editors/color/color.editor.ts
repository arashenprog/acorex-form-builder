import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';

@Component({
    template: `
        <ax-color-picker  [value]="value" (valueChange)="handleValueChange($event)" >
        </ax-color-picker>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFColorEditorComponent extends AXFProperyEditor<string> implements OnInit {



    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        this.initiated = true;
    }

}
