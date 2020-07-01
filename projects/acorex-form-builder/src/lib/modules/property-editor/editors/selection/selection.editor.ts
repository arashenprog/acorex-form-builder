import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';

@Component({
    template: `
        <ax-selection-list
            [direction]="direction"
            [mode]="mode"
            [textField]="textField"
            [valueField]="valueField"
            [items]="items"
            [selectedValues]="value"
            (selectedValuesChange)="handleValueChange($event)"
        >
        </ax-selection-list>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFSelectionEditorComponent extends AXFProperyEditor<any>  {

    items: any[] = [];
    textField: string = 'title';
    valueField: string = 'value';
    direction: 'horizontal' | 'vertical' = 'horizontal';
    mode: 'single' | 'multiple' = 'single';

    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }

    handleValueChange(v: any) {
        this.value = v;
    }

    ngAfterViewInit() {
        this.initiated = true;
    }

}
