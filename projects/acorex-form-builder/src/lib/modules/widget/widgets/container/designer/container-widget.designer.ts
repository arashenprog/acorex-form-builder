import { Component, OnInit, ElementRef } from '@angular/core';
import { AXFWidgetPickerComponent } from '../../../shared/widget-picker/widget-picker.component';
import { AXPopupService } from 'acorex-ui';
import { AXFWidgetDesigner } from '../../../config/widget';
import { WidgetConfig } from '../../../services/widget.service';

@Component({
    selector: '[axf-widget-container]',
    templateUrl: './container-widget.designer.html',
    styleUrls: ['./container-widget.designer.scss']
})
export class AXFContainerWidgetDesigner extends AXFWidgetDesigner  {
    
    constructor(private hostElement: ElementRef, private popup: AXPopupService) {
        super()
    }

    addElement() {
        this.popup.open(AXFWidgetPickerComponent, {
            title: "Add Element",
            size: "md"
        }).closed((c) => {
            if (c && c.data) {
                this.appendChild((c.data as WidgetConfig).name);
            }
        })
    }

}
