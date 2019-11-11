import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, Input, ViewChild } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXFWidgetPickerComponent } from '../../../shared/widget-picker/widget-picker.component';
import { AXPopupService } from 'acorex-ui';
import { WidgetConfig } from '../../../services/widget.service';

@Component({
    selector: "[axf-widget-checkbox]",
    templateUrl: './checkbox-input-widget.designer.html',
    styleUrls: ['./checkbox-input-widget.designer.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AXFCheckboxInputWidgetDesigner extends AXFWidgetDesigner {

    @ViewChild("el") el: ElementRef<HTMLElement>;

    value: boolean;
    label:string="Check me";
    constructor() {
        super()
    }

    onRender(): void {
        debugger
        //let s = this.el.nativeElement.firstElementChild as HTMLFieldSetElement;
        //s.style.visibility = "hidden";
        //s.style.display = "none";
        this.applyStyle(this.el.nativeElement.querySelector("label"));
    }

}
