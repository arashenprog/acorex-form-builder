import { Component, ViewEncapsulation, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { UploadStructure } from '../../../../property-editor/editors/upload/upload.structure';


@Component({
    selector: "[axf-widget-video]",
    templateUrl: './video-widget.designer.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFVideoWidgetDesigner extends AXFWidgetDesigner {


    value: UploadStructure; 
    constructor(private el: ElementRef<HTMLElement>,private cdr: ChangeDetectorRef) {
        super()
    }

    onRender(): void { 
        this.applyStyle(this.el.nativeElement.querySelector("img"));
        this.cdr.detectChanges();
    }

}