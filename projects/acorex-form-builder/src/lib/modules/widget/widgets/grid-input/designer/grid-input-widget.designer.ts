import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, Input, ViewChild } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXFWidgetPickerComponent } from '../../../shared/widget-picker/widget-picker.component';
import { AXPopupService } from 'acorex-ui';
import { WidgetConfig } from '../../../services/widget.service';

@Component({
    selector: "[axf-widget-text]",
    templateUrl: './grid-input-widget.designer.html',
    styleUrls: ['./grid-input-widget.designer.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AXFGridInputWidgetDesigner extends AXFWidgetDesigner {

    @ViewChild("el") el: ElementRef<HTMLElement>;

    value:string[];
    data:{columns:any[],rowCount:number,fillBy:string[],dsName:string[]}; 
    header:string;
    footer:string;



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


    getStyles(mode) { 
        const styles = { 
            'border-radius': mode == 'single' ? 100+"%" : 0 
        };
        return styles;
    }

}




