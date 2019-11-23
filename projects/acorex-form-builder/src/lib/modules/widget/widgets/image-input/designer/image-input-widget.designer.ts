import { Component, ViewEncapsulation, ElementRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';


@Component({
    selector: "[axf-widget-image]",
    templateUrl: './image-input-widget.designer.html',
    encapsulation: ViewEncapsulation.None
})
export class AXFImageInputWidgetDesigner extends AXFWidgetDesigner {


    value: string;
    height:number;
    width:number;
    alt:string;
    constructor(private el: ElementRef<HTMLElement>) {
        super()
    }

    onRender(): void {
        this.applyStyle(this.el.nativeElement.querySelector("img"));
    }

}