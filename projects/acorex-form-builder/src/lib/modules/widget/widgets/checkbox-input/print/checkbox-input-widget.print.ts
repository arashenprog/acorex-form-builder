import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './checkbox-input-widget.print.html',
    styleUrls: ['./checkbox-input-widget.print.scss'],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFCheckboxInputWidgetPrint extends AXFWidgetPrint {

    value: boolean;
    label:string;

    color:String;
    bgColor:String;
    fontSize:string;
    textStyle:string[];
    textAlign:string[]; 
    boxStyle:any;
    constructor() {
        super()
    }
}
