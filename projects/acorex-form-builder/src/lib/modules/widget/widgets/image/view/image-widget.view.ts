import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { UploadStructure } from '../../../../property-editor/editors/upload/upload.structure';

@Component({
    templateUrl: './image-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFImageWidgetView extends AXFWidgetView {

    value: UploadStructure; 
    alt: string;

    constructor(private el: ElementRef<HTMLElement>,private cdr:ChangeDetectorRef) {
        super()
    }

 
    onRender(): void {
        this.cdr.markForCheck();
        //this.applyStyle(this.el.nativeElement.querySelector("img"));
    }
}