import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, Input, ViewChild } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXFWidgetPickerComponent } from '../../../shared/widget-picker/widget-picker.component';
import { AXPopupService } from 'acorex-ui';
import { WidgetConfig } from '../../../services/widget.service';

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