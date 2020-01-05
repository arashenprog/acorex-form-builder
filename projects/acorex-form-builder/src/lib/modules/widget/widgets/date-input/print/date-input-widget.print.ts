import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { AXDateTime } from 'acorex-ui';

@Component({
    templateUrl: './date-input-widget.print.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFDateInputWidgetPrint extends AXFWidgetPrint {

    // text: String;
    // placeholder: String;
    // color: String;
    // bgColor: String;
    // fontSize: string;
    // textStyle: string[];
    // textAlign: string;
    // boxStyle: any;

    value: any;

    constructor() {
        super();
    }

    ngOnInit() {
        if (!this.value)
            this.value = new AXDateTime();
    }
}
