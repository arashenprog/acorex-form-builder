import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './text-input-widget.print.html', 
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFTextInputWidgetPrint extends AXFWidgetPrint {

    text: String;
    placeholder:string;
    constructor() {
        super() 
    }
     
}
