import { Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    selector: 'tr',
    templateUrl: './table-row-widget.print.html',
    styleUrls: ['./table-row-widget.print.scss'],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFTableRowWidgetPrint extends AXFWidgetPrint {

    constructor(
        private el: ElementRef,
        private cdr: ChangeDetectorRef) {
        super();
    }

    onRender() {
        this.applyStyle(this.el.nativeElement);
        this.cdr.markForCheck();
    }
}

