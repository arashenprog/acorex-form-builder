import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, Input, ViewChild } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXFWidgetPickerComponent } from '../../../shared/widget-picker/widget-picker.component';
import { AXPopupService } from 'acorex-ui';
import { WidgetConfig } from '../../../services/widget.service';

@Component({
    selector: "[axf-widget-text]",
    templateUrl: './list-input-widget.designer.html',
    styleUrls: ['./list-input-widget.designer.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AXFListInputWidgetDesigner extends AXFWidgetDesigner {

    @ViewChild("el") el: ElementRef<HTMLElement>;

    value:string[];
    items:{ContenView:string[],Content:any[],ShowOther:boolean};
    mode:string;
    direction:string;
    fillBy:string;
    alignCheck:string;


    constructor() {
        super()
    }

    onRender(): void {
        this.applyStyle(this.el.nativeElement);
    }

    handleValueChange(e)
    {

    }


    getStyles(mode) { 
        const styles = { 
            'border-radius': mode == 'single' ? 100+"%" : 0 
        };
        return styles;
    }

}




