import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, Input, ViewChild } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';

@Component({
    selector: "[axf-widget-date]",
    templateUrl: './date-input-widget.designer.html',
    styleUrls: ['./date-input-widget.designer.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AXFDateInputWidgetDesigner extends AXFWidgetDesigner {

    constructor() {
        super()
    }

    onRender(): void {
    }

}
