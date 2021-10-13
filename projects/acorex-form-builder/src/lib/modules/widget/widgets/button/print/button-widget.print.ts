import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    selector: '[axf-button]',
    template: '',
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

