import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    selector: '[axf-panel]',
    templateUrl: './panel-widget.print.html', 
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFPanelWidgetPrint extends AXFWidgetPrint {

    caption: string;
    constructor() { 
         super();
    }
}

