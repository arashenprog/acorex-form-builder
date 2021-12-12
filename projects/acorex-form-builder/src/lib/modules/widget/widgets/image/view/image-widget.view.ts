import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFValueWidgetView, AXFWidgetView } from '../../../config/widget';
import { UploadStructure } from '../../../../property-editor/editors/upload/upload.structure';
import { AXFFormatService } from '../../../services/format.service';

@Component({
    templateUrl: './image-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFImageWidgetView extends AXFValueWidgetView {

    //value: UploadStructure;

    constructor(
        private el: ElementRef<HTMLElement>,
        protected cdr: ChangeDetectorRef,
        private formatService: AXFFormatService) {
        super(cdr); 
    }


    onRender(): void {
        this.cdr.markForCheck();
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.value.srcData && this.value.srcData.match(/\[(.*?)\]/g)) {
            let imagurl = this.formatService.format(this.value.srcData, this);
            if (imagurl.includes("base64"))
                this.value.srcData = imagurl;

        }
    }
}