import { Component, OnInit, ElementRef } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { AXFBoxStyleValue } from '../../../../property-editor/editors/style/box-style/box-style.class';

@Component({
    selector: '[axf-page]',
    templateUrl: './page-widget.view.html',
    styleUrls: ['./page-widget.view.scss']
})
export class AXFPageWidgetView extends AXFWidgetView {


    constructor(private hostElement: ElementRef) {
        super();
    }

    bgColor: string;
    boxStyle: AXFBoxStyleValue;
    pageDirection:string;


    onRender(): void {
        let el: HTMLElement = (this.hostElement.nativeElement as HTMLElement);
        el.style.direction= this.pageDirection;
        this.applyStyle(el);
    }



}

