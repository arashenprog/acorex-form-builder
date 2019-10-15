import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXFWidgetPickerComponent } from '../../../shared/widget-picker/widget-picker.component';
import { AXPopupService } from 'acorex-ui';
import { WidgetConfig } from '../../../services/widget.service';
import { AXFBoxStyleValue } from '../../../../property-editor/editors/style/box-style/box-style.class';

@Component({
    selector: "[axf-widget-col]",
    templateUrl: './col-widget.designer.html',
    styleUrls: ['./col-widget.designer.scss'],
})
export class AXFColWidgetDesigner extends AXFWidgetDesigner {
    
    size: number = 1;
    color: string;
    bgColor: string;
    boxStyle: AXFBoxStyleValue;

    @ViewChild("el")
    container:ElementRef<HTMLDivElement>;

    constructor(private hostElement: ElementRef, private popup: AXPopupService) {
        super()

    }

    onRender(): void {
        let el: HTMLElement = (this.hostElement.nativeElement as HTMLElement);
        el.classList.add("col-sm-12", `col-md-${this.size}`);
        // apply background color
        this.applyStyle(this.container.nativeElement);
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
