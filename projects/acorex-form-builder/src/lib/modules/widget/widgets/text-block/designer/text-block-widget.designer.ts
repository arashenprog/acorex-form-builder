import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, Input, ViewChild } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXFWidgetPickerComponent } from '../../../shared/widget-picker/widget-picker.component';
import { AXPopupService } from 'acorex-ui';
import { WidgetConfig } from '../../../services/widget.service';

@Component({
    selector: "[axf-widget-text]",
    templateUrl: './text-block-widget.designer.html',
    styleUrls: ['./text-block-widget.designer.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AXFTextBlockWidgetDesigner extends AXFWidgetDesigner {
   
    

    text: String;

    constructor(private hostElement: ElementRef) {
        super()
    }

    onRender(): void {
        let el: HTMLElement = (this.hostElement.nativeElement as HTMLElement);
        this.applyStyle(el);
    }

   
}
