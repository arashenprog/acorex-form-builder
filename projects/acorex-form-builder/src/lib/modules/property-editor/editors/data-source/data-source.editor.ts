import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';
import { AXFDataService } from '../../../widget/services/data.service';
import { AXFDataSourceValue } from './data-source.class';

@Component({
    templateUrl: `data-source.editor.html`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFDataSourceEditorComponent extends AXFProperyEditor<AXFDataSourceValue>  {

    innerValue: any[] = [];
    items: any[] = [];
    textField: string = "text";
    valueField: string = "value";

    constructor(protected cdr: ChangeDetectorRef, private dataService: AXFDataService) {
        super();
    }

    ngAfterViewInit(): void {
        this.dataService.getDSList().then(items => {
            this.items = items;
            this.innerValue = this.value ? [this.value.name] : [];
        });
    }

    handleValueChange(v: any) {
        this.innerValue = v.map(c => c[this.valueField]);
        let name = v[0][this.valueField];
        if (!this.value || name != this.value.name) {
            let params = v[0].params ? v[0].params.map(c => ({ name: c, value: null })) : [];
            this.value = new AXFDataSourceValue(name, params);
        }
    }

    handleParamChange(e) {
        super.handleValueChange(this.value);
    }
}
