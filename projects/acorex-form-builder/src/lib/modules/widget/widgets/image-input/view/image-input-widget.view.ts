import { Component, OnInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { UploadStructure } from '../../../../property-editor/editors/upload/upload.structure';

@Component({
    templateUrl: './image-input-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFImageInputWidgetView extends AXFWidgetView {

    value: UploadStructure; 
    alt: string;

    constructor(private el: ElementRef<HTMLElement>) {
        super()
    }


    onRender(): void {
        this.applyStyle(this.el.nativeElement.querySelector("img"));
    }
}