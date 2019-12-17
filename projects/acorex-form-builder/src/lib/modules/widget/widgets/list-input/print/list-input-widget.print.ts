import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './list-input-widget.print.html',
    changeDetection:ChangeDetectionStrategy.OnPush
   // styleUrls: ['./list-input-widget.print.scss']
})
export class AXFListInputWidgetPrint extends AXFWidgetPrint {


    constructor() {
        super()
    }
}
