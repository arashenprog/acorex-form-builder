import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './time-input-widget.print.html', 
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTimeInputWidgetPrint extends AXFWidgetPrint {

    text: String;
    placeholder: String;

    constructor() {
        super();
    }
}
