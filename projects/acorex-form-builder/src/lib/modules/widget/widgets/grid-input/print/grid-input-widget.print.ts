import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './grid-input-widget.print.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFGridInputWidgetPrint extends AXFWidgetPrint {


    constructor() {
        super()
    }
}
