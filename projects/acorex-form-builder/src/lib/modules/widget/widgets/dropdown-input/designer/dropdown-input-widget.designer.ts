import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, Input, ViewChild } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXFWidgetPickerComponent } from '../../../shared/widget-picker/widget-picker.component';
import { AXPopupService } from 'acorex-ui';
import { WidgetConfig } from '../../../services/widget.service';

@Component({
    selector: "[axf-widget-text]",
    templateUrl: './dropdown-input-widget.designer.html', 
    encapsulation: ViewEncapsulation.None
})
export class AXFDropdownInputWidgetDesigner extends AXFWidgetDesigner {

    @ViewChild("el") el: ElementRef<HTMLElement>;

    value:string[];
    items:{ContentView:string[],Content:any[],ShowOther:boolean};
    mode:string;
    fillBy:string; 
    allowSearch:boolean;

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




