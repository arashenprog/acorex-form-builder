import { Component, OnInit } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    templateUrl: './row-widget.view.html',
    styleUrls: ['./row-widget.view.scss']
})
export class AXFRowWidgetView extends AXFWidgetView {
    constructor() {
        super()
     }
}
