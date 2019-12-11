import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';
import { AXFDataService } from '../../../widget/services/data.service';

@Component({
    template: `
        <ax-select-box  
            [allowSearch]="false" 
            [items]="items"
            [selectedValues]="innerValue" 
            (selectedValuesChange)="handleValueChange($event)"  
            [textField]="textField" 
            [valueField]="valueField"
        >
        </ax-select-box>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFDropdownEditorComponent extends AXFProperyEditor<any[]>  {

    innerValue: any[] = [];
    items: any[] = [];
    textField: string = "title";
    valueField: string = "value";
    dataSource: string;



    constructor(protected cdr: ChangeDetectorRef, private dataService: AXFDataService) {
        super();
    }



    ngAfterViewInit(): void {
        if (this.dataSource) {
            this.dataService.getList(this.dataSource).then(items => {
                this.items = items;
                this.innerValue = [this.value];
                this.cdr.markForCheck();
            });
        }
        else {
            this.innerValue = [this.value];
            this.cdr.markForCheck();
        }
    }

    handleValueChange(v: any) {
        debugger;
        this.innerValue = v;
        this.value = v[0];
    }
}
