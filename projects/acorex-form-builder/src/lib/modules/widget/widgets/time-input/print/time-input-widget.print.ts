import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './time-input-widget.print.html',
    // styleUrls: ['./time-input-widget.print.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTimeInputWidgetPrint extends AXFWidgetPrint {

    text: String;
    placeholder: String;
    color:String;
    bgColor:String;
    fontSize:string;
    textStyle:string[];
    textAlign:string; 
    boxStyle:any;

    constructor() {
        super();
    }
}
