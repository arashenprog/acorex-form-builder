import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './text-input-widget.print.html',
    styleUrls: ['./text-input-widget.print.scss'],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFTextInputWidgetPrint extends AXFWidgetPrint {

    text: String;

    constructor() {
        super()
    }
}
