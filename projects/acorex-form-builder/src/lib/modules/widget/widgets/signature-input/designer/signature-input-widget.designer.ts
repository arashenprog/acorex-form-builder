import { Component,  ViewEncapsulation, ElementRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';


@Component({
    selector: "[axf-widget-signature]",
    templateUrl: './signature-input-widget.designer.html',
    styleUrls: ['./signature-input-widget.designer.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AXFSignatureInputWidgetDesigner extends AXFWidgetDesigner {


    value: string;
    height:number;
    width:number; 
    constructor(private el: ElementRef<HTMLElement>) {
        super()
    }

    onRender(): void {
        this.applyStyle(this.el.nativeElement.querySelector("div"));
    }

}