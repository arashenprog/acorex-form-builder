import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    selector: '[axf-table]',
    templateUrl: './table-widget.print.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTableWidgetPrint extends AXFWidgetPrint {

    @ViewChild("table") table: ElementRef<HTMLTableElement>;
    constructor(
        private cdr: ChangeDetectorRef) {
        super();
    }

    ngAfterViewInit() {
        this.applyStyle(this.table.nativeElement);
        this.cdr.markForCheck();
    }
    

    getHeader() {
        return this.widgets.filter(c => c.options.isHeader == true);
    }

    getBody() {
        return this.widgets.filter(c => c.options.isHeader == false);
    }
}

