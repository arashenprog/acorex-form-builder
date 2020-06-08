import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({
    templateUrl: './dropdown-input-widget.print.html' ,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AXFDropdownInputWidgetPrint extends AXFWidgetPrint {

    dataSource: AXFDataSourceOption;
    text: string;
    textAlign:string;
    constructor(private cdr: ChangeDetectorRef) {
        super();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.value) {
            if (Array.isArray(this.value)) {
                this.text = this.value.map(c => c[this.dataSource.columns[1]['fieldName']]).join(', ');
            }
            else {
                this.text = this.value[this.dataSource.columns[1]['fieldName']];
            }
            this.cdr.detectChanges();
        }
    }
}
