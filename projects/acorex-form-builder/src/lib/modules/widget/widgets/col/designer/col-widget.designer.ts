import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXFBoxStyleValue } from '../../../../property-editor/editors/style/box-style/box-style.class';
import { AXFWidgetPickerService } from '../../../services/template/picker.service';

@Component({
    selector: "[axf-widget-col]",
    templateUrl: './col-widget.designer.html',
    styleUrls: ['./col-widget.designer.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFColWidgetDesigner extends AXFWidgetDesigner {

    size: number = 1;
    color: string;
    bgColor: string;
    boxStyle: AXFBoxStyleValue;

  

    constructor(
        private hostElement: ElementRef,
        private picker: AXFWidgetPickerService,
        private cdr: ChangeDetectorRef) {
        super()

    }

    onRender(): void {
        let el: HTMLElement = (this.hostElement.nativeElement as HTMLElement);
        el.classList.add("col-sm-12", `col-md-${this.size}`);
        // apply background color
        this.applyStyle(this.hostElement.nativeElement);
        this.cdr.markForCheck();
    }

    addElement() {
        this.picker.showPicker().then(widgets => {
            if (widgets) {
                widgets.forEach(w => {
                    this.addChild(w);
                });
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
