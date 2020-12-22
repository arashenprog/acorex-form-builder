import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { UploadStructure } from '../../../../property-editor/editors/upload/upload.structure';

@Component({
    templateUrl: './file-upload-widget.print.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {role: 'file-upload'}  
})
export class AXFFileUploadWidgetPrint extends AXFWidgetPrint {
 
    constructor(private el: ElementRef<HTMLElement>, private cdr: ChangeDetectorRef) {
        super()
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.cdr.detectChanges(); 
    }

}