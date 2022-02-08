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

    constructor(protected cdr: ChangeDetectorRef,
        private hostElement: ElementRef<HTMLTableCellElement>) {
        super()
    }
    onRender() {
        if (!this.visible)
        {
            let el = this.hostElement.nativeElement; 
            el.style.display="none";
            this.applyStyle(el);
            this.cdr.detectChanges();
        }
    }

    ngOnInit() {
        let el = this.hostElement.nativeElement;
        el.style.width = "100%";
        el.style.tableLayout = "fixed";
        el.style.boxSizing = "box-sizing";
        el.style.borderSpacing = "0px"; 
        el.classList.add("realRow");
        this.applyStyle(el);
        this.cdr.detectChanges();
    }

}
