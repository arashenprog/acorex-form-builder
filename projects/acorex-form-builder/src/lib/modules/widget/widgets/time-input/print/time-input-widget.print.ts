import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { AXDateTime } from 'acorex-ui';

@Component({
    templateUrl: './time-input-widget.print.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTimeInputWidgetPrint extends AXFWidgetPrint {

    constructor(protected cdr: ChangeDetectorRef) {
        super();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        if(!this.value)
            this.value= new AXDateTime().format('HH:mm');
        this.cdr.detectChanges();
    }
}
