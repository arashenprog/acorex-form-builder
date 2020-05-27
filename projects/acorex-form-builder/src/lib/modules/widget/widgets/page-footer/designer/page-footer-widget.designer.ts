import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXFWidgetPickerService } from '../../../services/template/picker.service';

@Component({
    selector: '[axf-page-footer]',
    templateUrl: './page-footer-widget.designer.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: "axf-drop-zone" }

})
export class AXFPageFooterWidgetDesigner extends AXFWidgetDesigner {

    constructor(private picker: AXFWidgetPickerService, private cdr: ChangeDetectorRef) {
        super();
    }



    onRender() {
        this.cdr.markForCheck();
    }
}

