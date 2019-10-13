import { Component, OnInit, ElementRef, HostBinding } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { AXFBoxStyleValue } from '../../../../property-editor/editors/style/box-style/box-style.class';

@Component({
    templateUrl: './col-widget.view.html',
    styleUrls: ['./col-widget.view.scss']
})
export class AXFColWidgetView extends AXFWidgetView {


    size: number;
    @HostBinding("style.color")
    color: string;

    @HostBinding("style.background")
    bgColor: string;

    boxStyle: AXFBoxStyleValue;


    constructor(private hostElement: ElementRef) {
        super()
    }

    ngOnInit(): void {
        debugger;
        let el: HTMLElement = (this.hostElement.nativeElement as HTMLElement);
        el.classList.add("col-sm-12", `col-md-${this.size}`);
        // apply padding
        el.style.paddingTop = `${this.boxStyle.padding.top}px`;
        el.style.paddingBottom = `${this.boxStyle.padding.bottom}px`;
        el.style.paddingLeft = `${this.boxStyle.padding.left}px`;
        el.style.paddingRight = `${this.boxStyle.padding.right}px`;
        // apply border size
        el.style.borderTop = `${this.boxStyle.border.top}px solid #000`;
        el.style.borderBottom = `${this.boxStyle.border.bottom}px solid #000`;
        el.style.borderLeft = `${this.boxStyle.border.left}px solid #000`;
        el.style.borderRight = `${this.boxStyle.border.right}px solid #000`;
        // apply margin size
        el.style.marginTop = `${this.boxStyle.margin.top}px`;
        el.style.marginBottom = `${this.boxStyle.margin.bottom}px`;
        el.style.marginLeft = `${this.boxStyle.margin.left}px`;
        el.style.marginRight = `${this.boxStyle.margin.right}px`;
    }
}
