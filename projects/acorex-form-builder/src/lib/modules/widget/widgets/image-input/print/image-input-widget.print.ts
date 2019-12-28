import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './image-input-widget.print.html' ,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFImageInputWidgetPrint extends AXFWidgetPrint {

    value: string;
    height:number;
    width:number;
    alt:string;
    boxStyle:any;
    constructor() {
        super()
    }
}
