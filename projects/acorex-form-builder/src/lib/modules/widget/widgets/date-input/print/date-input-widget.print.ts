import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { AXDateTime } from 'acorex-ui';

@Component({
    templateUrl: './date-input-widget.print.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFDateInputWidgetPrint extends AXFWidgetPrint {


    textStyle: string[];
    displayFormat: string;

    constructor(protected cdr: ChangeDetectorRef) {
        super();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        if(!this.value)
            this.value=new Date();
        this.cdr.detectChanges();
    }
    
}
