import { Component, OnInit } from '@angular/core';
import { AXFWidgetView } from '../../widget';

@Component({
    templateUrl: './col-widget.view.html',
    styleUrls: ['./col-widget.view.scss']
})
export class AXFColWidgetView extends AXFWidgetView {
    constructor() {
        super()
     }
}
