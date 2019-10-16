import { Component, OnInit, ElementRef, HostBinding } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { AXFBoxStyleValue } from '../../../../property-editor/editors/style/box-style/box-style.class';

@Component({
    selector: "[axf-widget-col]",
    templateUrl: './col-widget.view.html',
    styleUrls: ['./col-widget.view.scss']
})
export class AXFColWidgetView extends AXFWidgetView {


    size: number;
    color: string;
    bgColor: string;
    boxStyle: AXFBoxStyleValue;


    constructor(private hostElement: ElementRef) {
        super()
    }

    onRender(): void {
        let el: HTMLElement = (this.hostElement.nativeElement as HTMLElement);
        el.classList.add("col-sm-12", `col-md-${this.size}`);
        el.style.display="table-cell";
        // apply background color
        this.applyStyle(el);
    }
}
