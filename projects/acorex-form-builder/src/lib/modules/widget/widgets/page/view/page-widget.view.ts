import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { AXFBoxStyleValue } from '../../../../property-editor/editors/style/box-style/box-style.class';

@Component({
    selector: '[axf-page]',
    templateUrl: './page-widget.view.html',
    styleUrls: ['./page-widget.view.scss'],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFPageWidgetView extends AXFWidgetView {


    constructor(private hostElement: ElementRef,private cdr:ChangeDetectorRef) {
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

