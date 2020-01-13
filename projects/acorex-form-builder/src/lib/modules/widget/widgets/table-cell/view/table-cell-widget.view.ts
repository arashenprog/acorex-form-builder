import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    selector: 'td',
    templateUrl: './table-cell-widget.view.html',
    styleUrls: ['./table-cell-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTableCellWidgetView extends AXFWidgetView {

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

