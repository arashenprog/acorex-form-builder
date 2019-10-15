import { Component, OnInit, ElementRef } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    templateUrl: './text-block-widget.view.html',
    styleUrls: ['./text-block-widget.view.scss']
})
export class AXFTextBlockWidgetView extends AXFWidgetView {

    text: String;

    constructor(private el: ElementRef) {
        super()
    }

    onRender(): void {
        this.applyStyle(this.el.nativeElement)
    }
}
