import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    selector: "[axf-widget-row]",
    templateUrl: './row-widget.print.html',
    styleUrls: ['./row-widget.print.scss'],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFRowWidgetPrint extends AXFWidgetPrint {

    bgColor:String;
    boxStyle:any; 

    constructor() {
        super()
     }
 
}
