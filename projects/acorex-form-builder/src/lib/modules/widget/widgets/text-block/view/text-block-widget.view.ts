import { Component, OnInit } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    templateUrl: './text-block-widget.view.html',
    styleUrls: ['./text-block-widget.view.scss']
})
export class AXFTextBlockWidgetView extends AXFWidgetView {

    text: String;

    constructor() {
        super()
    }
}
