import { Component, OnInit } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    selector: '[axf-button]',
    templateUrl: './button-widget.print.html',
    styleUrls: ['./button-widget.print.scss']
})
export class AXFButtonWidgetPrint extends AXFWidgetPrint {

    constructor() { super()}
}

