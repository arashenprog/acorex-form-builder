import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';

@Component({
    selector: '[axf-button]',
    templateUrl: './button-widget.designer.html',
    styleUrls: ['./button-widget.designer.scss']
})
export class AXFButtonWidgetDesigner extends AXFWidgetDesigner {

    type: string;
    text: string;
    size:string;

    constructor() {
        super();
    }
}

