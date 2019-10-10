import { Component, OnInit } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './row-widget.print.html',
    styleUrls: ['./row-widget.print.scss']
})
export class AXFRowWidgetPrint extends AXFWidgetPrint {
    constructor() {
        super()
     }
}
