import { Component, OnInit } from '@angular/core';
import { AXFWidgetPrint } from '../../widget';

@Component({
    templateUrl: './row-widget.print.html',
    styleUrls: ['./row-widget.print.scss']
})
export class AXFRowWidgetPrint extends AXFWidgetPrint {
    constructor() {
        super()
     }
}
