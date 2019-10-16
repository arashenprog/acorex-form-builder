import { Component, OnInit } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    selector: "[axf-widget-col]",
    templateUrl: './col-widget.print.html',
    styleUrls: ['./col-widget.print.scss']
})
export class AXFColWidgetPrint extends AXFWidgetPrint {
    constructor() {
        super()
     }
}
