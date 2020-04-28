import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './map-input-widget.print.html', 
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFMapInputWidgetPrint extends AXFWidgetPrint {

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
