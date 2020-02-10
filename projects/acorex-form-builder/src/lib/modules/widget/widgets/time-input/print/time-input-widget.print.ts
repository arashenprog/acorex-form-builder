import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './time-input-widget.print.html', 
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTimeInputWidgetPrint extends AXFWidgetPrint {

    constructor(private cdr:ChangeDetectorRef) {
        super();
    }

    onRender(): void {
        if(!this.value)
            this.value="00:00";
        this.cdr.markForCheck();
    }
}
