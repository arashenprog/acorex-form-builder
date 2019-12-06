import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXFBoxStyleValue } from '../../../../property-editor/editors/style/box-style/box-style.class';
import { AXFWidgetPickerService } from '../../../services/template/picker.service';

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

    @ViewChild("el", { static: true })
    container: ElementRef<HTMLDivElement>;

    constructor(
        private hostElement: ElementRef, 
        private picker:AXFWidgetPickerService) {
        super()

    }

    onRender(): void {
        let el: HTMLElement = (this.hostElement.nativeElement as HTMLElement);
        el.classList.add("col-sm-12", `col-md-${this.size}`);
        // apply background color
        this.applyStyle(this.container.nativeElement);
    }

    addElement() {
        this.picker.showPicker().then(widgets => {
            if (widgets) {
                widgets.forEach(w => {
                    this.addChild(w);
                });
                
                this.refresh();
            }
        })
    }

    handleAction(action: string, e: MouseEvent) {
        e.stopPropagation();
        switch (action) {
            case "edit":
                this.edit();
                break;
            case "delete":
                this.delete();
                break;
            case "add":
                this.addElement();
                break;
        }
        return false;
    }
}
