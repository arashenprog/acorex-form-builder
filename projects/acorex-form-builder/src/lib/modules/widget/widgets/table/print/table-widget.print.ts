import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    selector: '[axf-table]',
    templateUrl: './table-widget.print.html',
    styleUrls: ['./table-widget.print.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTableWidgetPrint extends AXFWidgetPrint {

    constructor(
        private el: ElementRef<HTMLTableElement>,
        private cdr: ChangeDetectorRef) {
        super();
    }

    onRender() {
        this.applyStyle(this.el.nativeElement);
        this.cdr.markForCheck();
    }
}

