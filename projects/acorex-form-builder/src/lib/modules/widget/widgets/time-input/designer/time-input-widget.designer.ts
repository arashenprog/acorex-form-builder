import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget'; 

@Component({
    selector: "[axf-widget-time]",
    templateUrl: './time-input-widget.designer.html',
    // styleUrls: ['./time-input-widget.designer.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTimeInputWidgetDesigner extends AXFWidgetDesigner {

    @ViewChild("el1", { static: true }) el1: ElementRef<HTMLElement>;

    constructor() {
        super();
    } 

    onRender(): void { 
        // if(this.el1.nativeElement.querySelector("input")!=null)
        // this.applyStyle(this.el1.nativeElement.querySelector("input")); 
    }

}
