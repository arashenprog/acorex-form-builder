import { Component, OnInit } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './signature-input-widget.print.html' 
})
export class AXFSignatureInputWidgetPrint extends AXFWidgetPrint {

    value: string;
    height:number;
    width:number; 
    constructor() {
        super()
    }
}
