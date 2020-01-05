import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './text-area-widget.print.html', 
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFTextAreaWidgetPrint extends AXFWidgetPrint {

    text: String;
    placeholder: String;
   

    constructor() {
        super() 
    }
     
}
