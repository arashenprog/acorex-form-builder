import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    templateUrl: './grid-input-widget.view.html',
    styleUrls: ['./grid-input-widget.view.scss']
})
export class AXFGridInputWidgetView extends AXFWidgetView {

    @ViewChild("el") el: ElementRef<HTMLElement>;

    value:string[];
    data:{columns:any[],rowCount:number,fillBy:string[],dsName:string[]}; 
    header:string;
    footer:string; 

    constructor() {
        super()
    }

    onRender(): void {
        if(this.el)
        this.applyStyle(this.el.nativeElement);
    }

    handleValueChange(e)
    {

    }
 
}
