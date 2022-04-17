import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, Input, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget'; 

@Component({
    selector: "[axf-widget-link]",
    templateUrl: './link-input-widget.designer.html', 
    encapsulation: ViewEncapsulation.None,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFLinkInputWidgetDesigner extends AXFWidgetDesigner {

    placeholder: String;

    constructor(private cdr: ChangeDetectorRef) {
        super()
    }

    onRender(): void {
        this.cdr.markForCheck();
    }

}