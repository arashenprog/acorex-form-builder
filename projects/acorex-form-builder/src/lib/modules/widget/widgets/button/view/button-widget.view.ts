import { Component, OnInit } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    selector: '[axf-button]',
    templateUrl: './button-widget.view.html',
    styleUrls: ['./button-widget.view.scss']
})
export class AXFButtonWidgetView extends AXFWidgetView {


    type: string;
    text: string;
    size: string;

    constructor() { super()}
}

