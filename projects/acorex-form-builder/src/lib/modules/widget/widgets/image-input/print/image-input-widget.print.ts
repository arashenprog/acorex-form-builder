import { Component, OnInit } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './image-input-widget.print.html' 
})
export class AXFImageInputWidgetPrint extends AXFWidgetPrint {

    value: string;
    height:number;
    width:number;
    alt:string;
    constructor() {
        super()
    }
}
