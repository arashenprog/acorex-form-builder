import { Component, OnInit } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './text-block-widget.print.html',
    styleUrls: ['./text-block-widget.print.scss']
})
export class AXFTextBlockWidgetPrint extends AXFWidgetPrint {
    constructor() {
        super()
    }
}
