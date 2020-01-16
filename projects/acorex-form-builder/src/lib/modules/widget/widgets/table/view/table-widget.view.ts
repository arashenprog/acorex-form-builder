import { Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation, ViewChild } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    selector: '[axf-table]',
    templateUrl: './table-widget.view.html',
    styleUrls: ['./table-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AXFTableWidgetView extends AXFWidgetView {

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

