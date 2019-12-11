import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';
import { AXFDataService } from '../../../widget/services/data.service';

@Component({
    template: `
        <ax-selection-list 
            [direction]="direction" 
            [mode]="mode" 
            [textField]="textField" 
            [valueField]="valueField"
            [items]="items" 
            [selectedValues]="innerValue" 
            (selectedValuesChange)="handleValueChange($event)" 
        >
        </ax-selection-list>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFSelectionEditorComponent extends AXFProperyEditor<any[]>  {

    innerValue: any[] = [];

    items: any[] = [];
    textField: string = "title";
    valueField: string = "value";
    direction: "horizontal" | "vertical" = "horizontal";
    mode: "single" | "multiple" = "single";

    constructor(protected cdr: ChangeDetectorRef, private dataService: AXFDataService) {
        super();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.innerValue = this.value;
            this.cdr.markForCheck();
        });
    }

    handleValueChange(v: any) {
        this.innerValue = v;
        this.value = v;
    }
}
