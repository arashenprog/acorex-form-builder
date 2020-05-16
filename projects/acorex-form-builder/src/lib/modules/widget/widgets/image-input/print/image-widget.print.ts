import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { UploadStructure } from '../../../../property-editor/editors/upload/upload.structure';

@Component({
    templateUrl: './image-widget.print.html' ,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFImageWidgetPrint extends AXFWidgetPrint {

    value: UploadStructure; 
    alt:string;
    boxStyle:any;
    constructor() {
        super()
    }
}
