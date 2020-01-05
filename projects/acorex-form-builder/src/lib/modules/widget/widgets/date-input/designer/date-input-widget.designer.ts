import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget'; 

@Component({
    selector: "[axf-widget-date]",
    templateUrl: './date-input-widget.designer.html',
    styleUrls: ['./date-input-widget.designer.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFDateInputWidgetDesigner extends AXFWidgetDesigner {


    constructor() {
        super();
    } 

    onRender(): void { 
    }

}
