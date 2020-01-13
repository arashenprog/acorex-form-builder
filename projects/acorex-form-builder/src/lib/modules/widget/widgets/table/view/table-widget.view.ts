import { Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    selector: '[axf-table]',
    templateUrl: './table-widget.view.html',
    styleUrls: ['./table-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTableWidgetView extends AXFWidgetView {

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

