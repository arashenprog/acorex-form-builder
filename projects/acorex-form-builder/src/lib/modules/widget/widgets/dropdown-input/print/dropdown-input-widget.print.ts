import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({
    templateUrl: './dropdown-input-widget.print.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AXFDropdownInputWidgetPrint extends AXFWidgetPrint {

    dataSource: AXFDataSourceOption;
    text: string;
    textAlign: string;
    mode = 'single';
    constructor(private cdr: ChangeDetectorRef, private el: ElementRef<HTMLDivElement>) {
        super();
    }

    onRender(): void {
        if (this.el) {
            this.applyStyle(this.el.nativeElement);
        } 
        this.cdr.detectChanges();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.value == undefined && this['rIndex'] >= 0 && this['dataContext'] != undefined &&
            this['dataContext'].hasOwnProperty(this['name'])) {
            this.value = this.dataSource.dataItems.filter(w=>w[this.dataSource.columns[0]['fieldName']]==this['dataContext'][this['name']]);
        }
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
