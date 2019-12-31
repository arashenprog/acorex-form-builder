import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './text-area-widget.print.html',
    //styleUrls: ['./text-area-widget.print.scss'],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFTextAreaWidgetPrint extends AXFWidgetPrint {

    text: String;
    placeholder: String;
    color:String;
    bgColor:String;
    fontSize:string;
    textStyle:string[];
    textAlign:string; 
    boxStyle:any;

    constructor() {
        super() 
    }
     
}
