import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { UploadStructure } from '../../../../property-editor/editors/upload/upload.structure';

@Component({
    templateUrl: './video-input-widget.print.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {role: 'video-input'}  
})
export class AXFVideoInputWidgetPrint extends AXFWidgetPrint {

    height: number;
    width: number;
    alt: string;
    //value: UploadStructure; 
    constructor(private el: ElementRef<HTMLElement>, private cdr: ChangeDetectorRef) {
        super()
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.cdr.detectChanges(); 
    }

}