import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { AXFValueWidgetView, AXFWidgetView } from '../../../config/widget';
import { UploadStructure } from '../../../../property-editor/editors/upload/upload.structure';
import { AXFFormatService } from '../../../services/format.service';

@Component({
    templateUrl: './video-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFVideoWidgetView extends AXFWidgetView {
 
    private _value: UploadStructure;
    @Input()
    public get value(): UploadStructure {
        return this._value;
    }
    public set value(v: UploadStructure) {
        if (JSON.stringify(v) !== JSON.stringify(this._value)) { 
            this._value=v;
            this.dataService.setValue(this.getPath(), v);
            this.cdr.detectChanges();  
        }
    }

    constructor(
        private el: ElementRef<HTMLElement>,
        protected cdr: ChangeDetectorRef,
        private formatService: AXFFormatService) {
        super(); 
    }


    onRender(): void {
        this.cdr.markForCheck();
    }

    ngOnInit() {
        super.ngOnInit();
        // if (this.value.srcData && this.value.srcData.match(/\[(.*?)\]/g)) {
        //     let imagurl = this.formatService.format(this.value.srcData, this);
        //     if (imagurl.includes("base64"))
        //         this.value.srcData = imagurl;

        // }
    }
}