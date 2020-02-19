import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({
    templateUrl: './signature-input-widget.print.html' ,
    styleUrls: ['./signature-input-widget.print.scss'],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFSignatureInputWidgetPrint extends AXFWidgetPrint {

    //dataSource: AXFDataSourceOption; 
    height:number;
    width: number;
    constructor() {
        super()
    }
}
