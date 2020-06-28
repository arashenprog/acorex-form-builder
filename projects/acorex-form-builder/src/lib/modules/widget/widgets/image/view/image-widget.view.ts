import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { UploadStructure } from '../../../../property-editor/editors/upload/upload.structure';
import { AXFFormatService } from '../../../services/format.service'; 

@Component({
    templateUrl: './image-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFImageWidgetView extends AXFWidgetView  {

    value: UploadStructure; 
    alt: string;

    constructor(private el: ElementRef<HTMLElement>,private cdr:ChangeDetectorRef,
        private formatService: AXFFormatService ) {
        super()
        // this.dataSubscription = this.dataService.onChange.subscribe((data) => {
        //     this.hostElement.nativeElement.innerHTML = this.formatService.format(this.text, this);
        // });
    }

 
    onRender(): void {
        this.cdr.markForCheck();
        //this.applyStyle(this.el.nativeElement.querySelector("img"));
    }

    ngOnInit()
    {
        super.ngOnInit();
        if(this.value.srcData.match(/\[(.*?)\]/g))  
        {
            let imagurl=this.formatService.format(this.value.srcData, this);
            if(imagurl.includes("base64"))
                this.value.srcData=imagurl; 

        }    
    }
}