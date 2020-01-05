import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, Input, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget'; 

@Component({
    selector: "[axf-widget-text]",
    templateUrl: './text-input-widget.designer.html',
    styleUrls: ['./text-input-widget.designer.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFTextInputWidgetDesigner extends AXFWidgetDesigner {

    placeholder: String;

    constructor(private cdr: ChangeDetectorRef) {
        super()
    }

    onRender(): void {
        this.cdr.markForCheck();
    }

}
