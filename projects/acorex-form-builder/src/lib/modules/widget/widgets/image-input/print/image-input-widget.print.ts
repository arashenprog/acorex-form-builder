import { Component, OnInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { UploadStructure } from '../../../../property-editor/editors/upload/upload.structure';

@Component({
    templateUrl: './image-input-widget.print.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFImageInputWidgetPrint extends AXFWidgetView {

    height: number;
    width: number;
    alt: string;

    constructor(private el: ElementRef<HTMLElement>) {
        super()
    }

 
    onRender(): void {
        //this.applyStyle(this.el.nativeElement.querySelector("img"));
    }
}