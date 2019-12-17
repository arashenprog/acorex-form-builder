import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './dropdown-input-widget.print.html',
    // styleUrls: ['./dropdown-input-widget.print.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFDropdownInputWidgetPrint extends AXFWidgetPrint {


    constructor() {
        super()
    }
}
