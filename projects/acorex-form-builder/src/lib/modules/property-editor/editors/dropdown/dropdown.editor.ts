import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';
import { AXFDataService } from '../../../widget/services/data.service';

@Component({
    template: `
        <ax-select-box  
            [allowSearch]="false" 
            [items]="items"
            [mode]="mode"
            [textField]="textField" 
            [valueField]="valueField"
            [selectedValues]="value" 
            (selectedValuesChange)="handleValueChange($event)"  
        >
        </ax-select-box>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFDropdownEditorComponent extends AXFProperyEditor<any>  {

    items: any[] = [];
    textField: string = "title";
    valueField: string = "value";
    dataSource: string;
    mode: "single" | "multiple" = "single";

    constructor(protected cdr: ChangeDetectorRef, private dataService: AXFDataService) {
        super();
    }

    ngAfterViewInit(): void {
        if (this.dataSource) {
            this.dataService.getList(this.dataSource).then(items => {
                this.items = items;
                this.cdr.markForCheck();
            });
        }
    }

    handleValueChange(v: any) {
        this.value = v;
    }
}
