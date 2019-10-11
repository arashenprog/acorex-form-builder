import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2 } from '@angular/core';
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
   
    text:string;

    constructor(private hostElement: ElementRef, private popup: AXPopupService) {
        super()

    }
    ngOnInit(): void {
        //(this.hostElement.nativeElement as HTMLElement).classList.add("axf-col", "col-sm-12", `col-md-${this.size}`)
    }

   
}
