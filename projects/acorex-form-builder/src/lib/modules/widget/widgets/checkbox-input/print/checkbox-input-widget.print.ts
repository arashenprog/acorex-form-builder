import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './checkbox-input-widget.print.html', 
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFCheckboxInputWidgetPrint extends AXFWidgetPrint {

    value: boolean;
    label:string;
    constructor() {
        super()
    }
}
