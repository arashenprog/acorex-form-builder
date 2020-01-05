import { Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    templateUrl: './date-input-widget.view.html',
    styleUrls: ['./date-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFDateInputWidgetView extends AXFWidgetView {

    constructor(private cdr: ChangeDetectorRef) {
        super();
    }

    ngAfterViewInit() {

    }

    onRender(): void {
        this.cdr.markForCheck();
    }

    dataChange(e) {

    }
}
