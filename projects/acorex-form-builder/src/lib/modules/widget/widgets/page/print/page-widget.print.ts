import { Component, OnInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { AXFBoxStyleValue } from '../../../../property-editor/editors/style/box-style/box-style.class';

@Component({
    selector: '[axf-page]',
    templateUrl: './page-widget.print.html',
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFPageWidgetPrint extends AXFWidgetPrint {

    constructor(private hostElement: ElementRef) {
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

