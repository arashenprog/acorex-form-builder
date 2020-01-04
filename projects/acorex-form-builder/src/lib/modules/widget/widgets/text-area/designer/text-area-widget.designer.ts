import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, Input, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget'; 

@Component({
    selector: "[axf-widget-text]",
    templateUrl: './text-area-widget.designer.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFTextAreaWidgetDesigner extends AXFWidgetDesigner {

    text: String;
    placeholder: String;
    rows: number;

    constructor(private cdr: ChangeDetectorRef) {
        super()
    }

    onRender(): void {
  
         this.cdr.markForCheck();
    }

}
