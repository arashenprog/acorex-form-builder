import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXFBoxStyleValue } from '../../../../property-editor/editors/style/box-style/box-style.class';
import { AXFWidgetPickerService } from '../../../services/template/picker.service';

@Component({
    selector: "[axf-repeater]",
    templateUrl: './repeater-widget.designer.html',
    //styleUrls: ['./repeater-widget.designer.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFRepeaterWidgetDesigner extends AXFWidgetDesigner {

    //@ViewChild("el") el: ElementRef<HTMLElement>;
    constructor(
        private hostElement: ElementRef,
        private picker: AXFWidgetPickerService,
        private cdr: ChangeDetectorRef) {
        super()

    }

    onRender(): void {
        // if (this.el)
        //     this.applyStyle(this.el.nativeElement);
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
}
