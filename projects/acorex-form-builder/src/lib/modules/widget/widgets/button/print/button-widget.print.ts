import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    selector: '[axf-button]',
    templateUrl: './button-widget.print.html',
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFButtonWidgetPrint extends AXFWidgetPrint {

    type: string;
    text: string;
    size:string;

    constructor() {
        super();
    }
}

