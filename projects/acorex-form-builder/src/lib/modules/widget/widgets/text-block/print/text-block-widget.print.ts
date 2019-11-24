import { Component, OnInit, ElementRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './text-block-widget.print.html',
    styleUrls: ['./text-block-widget.print.scss']
})
export class AXFTextBlockWidgetPrint extends AXFWidgetPrint {

    text: String;
    
    constructor(private hostElement: ElementRef) {
        super()
    }

    onRender(): void {
        let el: HTMLElement = (this.hostElement.nativeElement as HTMLElement);
        this.applyStyle(el);
    }
}
