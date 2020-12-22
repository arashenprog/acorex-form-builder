import { Component, ViewEncapsulation, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, HostBinding } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget'; 
@Component({
    selector: "[axf-widget-file-upload]",
    templateUrl: './file-upload-widget.designer.html',
    styleUrls: ['../view/file-upload-widget.view.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { style: 'display: flex;justify-content: center;align-items: center;' }
})
export class AXFFileUploadWidgetDesigner extends AXFWidgetDesigner {

    constructor(private el: ElementRef<HTMLElement>, private cdr: ChangeDetectorRef) {
        super();
    }
}