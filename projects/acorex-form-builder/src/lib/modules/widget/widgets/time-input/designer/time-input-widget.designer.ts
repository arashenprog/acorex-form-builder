import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';

@Component({
    selector: "[axf-widget-time]",
    templateUrl: './time-input-widget.designer.html',
    // styleUrls: ['./time-input-widget.designer.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTimeInputWidgetDesigner extends AXFWidgetDesigner {
    value: string = '00:00';
    constructor() {
        super();
    }
}
