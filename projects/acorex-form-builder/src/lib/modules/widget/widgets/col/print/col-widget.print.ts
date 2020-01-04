import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { AXFBoxStyleValue } from '../../../../property-editor/editors/style/box-style/box-style.class';

@Component({
    selector: "td",
    templateUrl: './col-widget.print.html',
    styleUrls: ['./col-widget.print.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFColWidgetPrint extends AXFWidgetPrint {
    size: number = 1;
    color: string;
    bgColor: string;
    boxStyle: AXFBoxStyleValue;


    constructor(
        private hostElement: ElementRef<HTMLTableCellElement>) {
        super()
    }

    ngOnInit() {
        let el = this.hostElement.nativeElement;
        el.style.width = ((this.size / 12) * 100) + '%';
        // el.style.backgroundColor = this.bgColor;
        // el.style.color = this.color;
        // el.style.padding.
        this.applyStyle(el);

    }
}
