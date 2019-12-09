import { Component, OnInit } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    selector: '[axf-panel]',
    templateUrl: './panel-widget.print.html',
    styleUrls: ['./panel-widget.print.scss']
})
export class AXFPanelWidgetPrint extends AXFWidgetPrint {

    constructor() { 
         super();
    }
}

