import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({
    templateUrl: './signature-input-widget.print.html' ,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFSignatureInputWidgetPrint extends AXFWidgetPrint {

    //dataSource: AXFDataSourceOption; 
    constructor() {
        super()
    }
}
