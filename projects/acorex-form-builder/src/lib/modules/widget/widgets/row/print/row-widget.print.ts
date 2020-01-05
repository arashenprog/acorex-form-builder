import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { AXFBoxStyleValue } from '../../../../property-editor/editors/style/box-style/box-style.class';

@Component({
    selector: "table",
    templateUrl: './row-widget.print.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFRowWidgetPrint extends AXFWidgetPrint {

    bgColor: String;
    boxStyle: AXFBoxStyleValue;

    constructor(
        private hostElement: ElementRef<HTMLTableCellElement>) {
        super()
    }

    ngOnInit() {
        let el = this.hostElement.nativeElement;
        el.style.width = "100%";
        el.style.tableLayout = "fixed";
        el.style.boxSizing = "box-sizing";
        el.style.borderSpacing = "0px";
        this.applyStyle(el);
    }

}
