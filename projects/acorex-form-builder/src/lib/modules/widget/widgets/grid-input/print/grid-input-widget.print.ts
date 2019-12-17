import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './grid-input-widget.print.html',
    // styleUrls: ['./list-input-widget.print.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFGridInputWidgetPrint extends AXFWidgetPrint {


    constructor() {
        super()
    }
}
