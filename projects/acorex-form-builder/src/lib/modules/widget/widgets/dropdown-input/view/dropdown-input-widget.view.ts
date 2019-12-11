import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    templateUrl: './dropdown-input-widget.view.html',
    //styleUrls: ['./dropdown-input-widget.view.scss']
})
export class AXFDropdownInputWidgetView extends AXFWidgetView {

    @ViewChild("el") el: ElementRef<HTMLElement>;

    value:string[];
    items:{ content:any[] };
    mode:string;
    fillBy:string; 
    allowSearch:boolean;

    constructor() {
        super()
       
    }

    onRender(): void {
        this.applyStyle(this.el.nativeElement);
    }

    handleValueChange(e)
    {

    }
 
}
