import { Component, OnInit } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './checkbox-input-widget.print.html',
    styleUrls: ['./checkbox-input-widget.print.scss']
})
export class AXFCheckboxInputWidgetPrint extends AXFWidgetPrint {

    value: boolean;
    label:string;
    constructor() {
        super()
    }
}
