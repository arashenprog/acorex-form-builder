import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewEncapsulation } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    selector: 'td',
    templateUrl: './table-cell-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AXFTableCellWidgetView extends AXFWidgetView {

    rIndex: number;

    constructor(
        private el: ElementRef<HTMLTableCellElement>,
        private cdr: ChangeDetectorRef) {
        super();
    }

    onRender() {
        this.applyStyle(this.el.nativeElement);
        if (this['colspan']) {
            this.el.nativeElement.colSpan = this['colspan'];
        }
        if (this['rowspan']) {
            this.el.nativeElement.rowSpan = this['rowspan'];
        }
        if (!this['width']) {
            this.el.nativeElement.style.width = '100px';
        }
        this.cdr.detectChanges();
    }
}

