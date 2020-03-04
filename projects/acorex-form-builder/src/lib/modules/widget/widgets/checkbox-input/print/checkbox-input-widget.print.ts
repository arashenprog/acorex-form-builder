import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './checkbox-input-widget.print.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFCheckboxInputWidgetPrint extends AXFWidgetPrint {

    label: string;
    size: number = 20;


    constructor(protected cdr: ChangeDetectorRef) {
        super();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.cdr.detectChanges();
    }
}
