import { Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    selector: 'td',
    templateUrl: './table-cell-widget.print.html',
    styleUrls: ['./table-cell-widget.print.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation:ViewEncapsulation.None
})
export class AXFTableCellWidgetPrint extends AXFWidgetPrint {

    constructor(
        private el: ElementRef<HTMLTableCellElement>,
        private cdr: ChangeDetectorRef) {
        super();
    }

    onRender() {
        this.applyStyle(this.el.nativeElement);
        if (this["colspan"]) {
            this.el.nativeElement.colSpan = this["colspan"];
        }
        if (this["rowspan"]) {
            this.el.nativeElement.rowSpan = this["rowspan"];
        }
        this.cdr.markForCheck();
    }
}

