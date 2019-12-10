import { Component, OnInit } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    selector: '[axf-panel]',
    templateUrl: './panel-widget.view.html',
    styleUrls: ['./panel-widget.view.scss']
})
export class AXFPanelWidgetView extends AXFWidgetView {

    caption:string;

    constructor() {
         super();
     }
}

