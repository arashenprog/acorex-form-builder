import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './text-input-widget.print.html', 
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFTextInputWidgetPrint extends AXFWidgetPrint {

    text: String;
    placeholder:string;
    textStyle:string[];
    constructor(protected cdr: ChangeDetectorRef) {
        super() 
    }

    onRender()
    {
        if(this.value==undefined && this['dataContext']!=undefined && 
        this['dataContext'].hasOwnProperty(this['name']))
        {
            this.value=this['dataContext'][this['name']];
        }
        this.cdr.markForCheck();
    }
     
}
