import { Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    selector: 'tr',
    templateUrl: './table-row-widget.print.html',
    styleUrls: ['./table-row-widget.print.scss'],
    changeDetection:ChangeDetectionStrategy.OnPush,
    encapsulation:ViewEncapsulation.None
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

