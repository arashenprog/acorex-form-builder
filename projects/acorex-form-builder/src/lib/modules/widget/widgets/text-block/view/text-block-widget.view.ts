import { Component, OnInit, ElementRef } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    selector: "[axf-widget-text]",
    templateUrl: './text-block-widget.view.html',
    styleUrls: ['./text-block-widget.view.scss']
})
export class AXFTextBlockWidgetView extends AXFWidgetView {

    text: string;

    
    constructor(private hostElement: ElementRef) {
        super()
    }

    onRender(): void {
        let el: HTMLElement = (this.hostElement.nativeElement as HTMLElement);
        this.applyStyle(el);
    }
}
