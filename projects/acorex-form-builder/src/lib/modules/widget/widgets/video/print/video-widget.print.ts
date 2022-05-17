import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, Input } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { UploadStructure } from '../../../../property-editor/editors/upload/upload.structure';
import { AXFFormatService } from '../../../services/format.service'; 

@Component({
    templateUrl: './video-widget.print.html' ,
    changeDetection:ChangeDetectionStrategy.OnPush,
    host: {role: 'video-box'} 
})
export class AXFVideoWidgetPrint extends AXFWidgetPrint {

    value: UploadStructure;
    boxStyle:any;
    constructor(private formatService: AXFFormatService,private cdr:ChangeDetectorRef,private hostElement: ElementRef) {
        super()
         
    }

    onRender(): void {
        this.cdr.detectChanges();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.cdr.detectChanges(); 
    } 
 
}
