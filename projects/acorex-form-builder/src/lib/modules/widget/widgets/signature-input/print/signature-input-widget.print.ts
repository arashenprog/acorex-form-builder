import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './signature-input-widget.print.html',
    styleUrls: ['./signature-input-widget.print.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFSignatureInputWidgetPrint extends AXFWidgetPrint {

    height: number;

    width: number;

    constructor(protected cdr: ChangeDetectorRef) {
        super();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.cdr.detectChanges();
    }
}
