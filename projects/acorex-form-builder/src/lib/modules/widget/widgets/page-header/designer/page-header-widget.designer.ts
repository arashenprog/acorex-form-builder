import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXFWidgetPickerService } from '../../../services/template/picker.service';

@Component({
    selector: '[axf-page-header]',
    templateUrl: './page-header-widget.designer.html',
    //styleUrls: ['./page-header-widget.designer.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: "axf-drop-zone" }

})
export class AXFPageHeaderWidgetDesigner extends AXFWidgetDesigner {

    constructor(private picker: AXFWidgetPickerService, private cdr: ChangeDetectorRef) {
        super();
    }

    // addElement() {
    //     this.picker.showPicker().then(widgets => {
    //         if (widgets) {
    //             widgets.forEach(w => {
    //                 this.addChild(w);
    //             });
    //             this.refresh();
    //         }
    //     })
    // }

    onRender() {
        this.cdr.markForCheck();
    }
}

