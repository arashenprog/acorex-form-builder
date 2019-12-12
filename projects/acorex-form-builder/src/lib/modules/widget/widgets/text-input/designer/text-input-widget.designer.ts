import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, Input, ViewChild } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXFWidgetPickerComponent } from '../../../shared/widget-picker/widget-picker.component';
import { AXPopupService } from 'acorex-ui';
import { WidgetConfig } from '../../../services/widget.service';

@Component({
    selector: "[axf-widget-text]",
    templateUrl: './text-input-widget.designer.html',
    styleUrls: ['./text-input-widget.designer.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AXFTextInputWidgetDesigner extends AXFWidgetDesigner {

    @ViewChild("el", { static: true }) el: ElementRef<HTMLElement>;

    text: String;
    placeholder: String;

    constructor() {
        super()
    }

    onRender(): void {
        let s = this.el.nativeElement.querySelector<HTMLFieldSetElement>("fieldset");
        s.style.visibility = "hidden";
        s.style.display = "none";
        this.applyStyle(this.el.nativeElement.querySelector("input"));
    }

}
