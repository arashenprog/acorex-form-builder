import { Component, OnInit, ElementRef } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    selector: "[axf-widget-row]",
    templateUrl: './row-widget.view.html',
    styleUrls: ['./row-widget.view.scss']
})
export class AXFRowWidgetView extends AXFWidgetView {
 
    constructor(private hostElement: ElementRef) {
        super()
    }

    onRender(): void {
        let el: HTMLElement = (this.hostElement.nativeElement as HTMLElement);
        el.classList.add("row");
        this.applyStyle(el);
    }

}
