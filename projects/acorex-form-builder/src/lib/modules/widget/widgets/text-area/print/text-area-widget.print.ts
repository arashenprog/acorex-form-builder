import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './text-area-widget.print.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTextAreaWidgetPrint extends AXFWidgetPrint {

    placeholder: string;
    rows: number;
    textStyle: string[];
    
    constructor(protected cdr: ChangeDetectorRef) {
        super();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.cdr.detectChanges();
    }
}
