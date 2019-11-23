import { Component, OnInit } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';
import { AXFDataService } from '../../../widget/services/data.service';

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
    dataSource: string;

    constructor(private dataService: AXFDataService) {
        super();
    }



    ngOnInit(): void {
        debugger;
        this.innerValue = this.value;
        if (this.dataSource) {
            this.dataService.fetch(this.dataSource).then(items => {
                this.items = items;
            });
        }
    }
}
