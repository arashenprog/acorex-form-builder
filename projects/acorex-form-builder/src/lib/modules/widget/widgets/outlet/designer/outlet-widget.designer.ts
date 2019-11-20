import { Component, OnInit } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';

@Component({
    selector: '[axf-outlet]',
    templateUrl: './outlet-widget.designer.html',
    styleUrls: ['./outlet-widget.designer.scss']
})
export class AXFOutletWidgetDesigner extends AXFWidgetDesigner {

    constructor() { 
        super();
    }
}

