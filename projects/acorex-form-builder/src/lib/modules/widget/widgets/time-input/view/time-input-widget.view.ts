import { Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    templateUrl: './time-input-widget.view.html',
    // styleUrls: ['./time-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTimeInputWidgetView extends AXFWidgetView { 
    @ViewChild("el1", { static: true }) el1: ElementRef<HTMLElement>;
   
    constructor(private el: ElementRef<HTMLElement>) {
        super();
    }
    
    ngAfterViewInit(){
        // if(this.el1.nativeElement.querySelector("input")!=null)
        // this.applyStyle(this.el1.nativeElement.querySelector("input"));
    }

    onRender(): void {
   }

    dataChange(e)
    {
         
    }
}
