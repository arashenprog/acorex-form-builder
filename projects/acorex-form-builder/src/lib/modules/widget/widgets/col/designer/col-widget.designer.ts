import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2 } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXFWidgetPickerComponent } from '../../../shared/widget-picker/widget-picker.component';
import { AXPopupService } from 'acorex-ui';
import { WidgetConfig } from '../../../services/widget.service';

@Component({
    selector: "[axf-widget-col]",
    templateUrl: './col-widget.designer.html',
    styleUrls: ['./col-widget.designer.scss'],
})
export class AXFColWidgetDesigner extends AXFWidgetDesigner {
    size: number = 1;

    constructor(private hostElement: ElementRef, private popup: AXPopupService) {
        super()

    }
    ngOnInit(): void {
        (this.hostElement.nativeElement as HTMLElement).classList.add("axf-col", "col-sm-12", `col-md-${this.size}`)
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
