import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './text-area-widget.print.html', 
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFTextAreaWidgetPrint extends AXFWidgetPrint {

    text: String;
    placeholder: String;
    rows:number;

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
