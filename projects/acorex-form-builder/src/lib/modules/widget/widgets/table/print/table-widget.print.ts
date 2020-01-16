import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    selector: '[axf-table]',
    templateUrl: './table-widget.print.html',
    styleUrls: ['./table-widget.print.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTableWidgetPrint extends AXFWidgetPrint {

    @ViewChild("table", { static: true }) table: ElementRef<HTMLTableElement>;
    constructor(
        private cdr: ChangeDetectorRef) {
        super();
    }

    onRender() {
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

