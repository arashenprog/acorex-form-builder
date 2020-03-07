import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, QueryList, ContentChildren, ViewChildren } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { AXFBoxStyleValue } from '../../../../property-editor/editors/style/box-style/box-style.class';

@Component({
    selector: '[axf-page]',
    templateUrl: './page-widget.view.html',
    styleUrls: ['./page-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFPageWidgetView extends AXFWidgetView {

    constructor(private hostElement: ElementRef, private cdr: ChangeDetectorRef) {
        super();
    }

    bgColor: string;
    themeColor: string;
    boxStyle: AXFBoxStyleValue;
    pageDirection: string;


    onRender(): void {
        const el: HTMLElement = (this.hostElement.nativeElement as HTMLElement);
        el.classList.remove('rtl', 'ltr');
        el.style.setProperty('--primary-color', this.themeColor);
        el.classList.add(this.pageDirection);
        this.applyStyle(el);
    }
}

