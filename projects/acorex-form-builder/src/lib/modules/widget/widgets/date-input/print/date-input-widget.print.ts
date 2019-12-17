import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './date-input-widget.print.html',
    styleUrls: ['./date-input-widget.print.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFDateInputWidgetPrint extends AXFWidgetPrint {

    text: String;

    constructor() {
        super();
    }
}
