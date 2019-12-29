import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { UploadStructure } from '../../../../property-editor/editors/upload/upload.structure';

@Component({
    templateUrl: './image-input-widget.print.html' ,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFImageInputWidgetPrint extends AXFWidgetPrint {

    value: UploadStructure; 
    alt:string;
    boxStyle:any;
    constructor() {
        super()
    }
}
