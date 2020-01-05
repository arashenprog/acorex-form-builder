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
    boxStyle: AXFBoxStyleValue;


    onRender(): void {
        let el: HTMLElement = (this.hostElement.nativeElement as HTMLElement);
        this.applyStyle(el);
    }

}

