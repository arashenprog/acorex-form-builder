import { Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ViewEncapsulation } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';

@Component({
    selector: '[axf-table]',
    templateUrl: './table-widget.designer.html',
    styleUrls: ['./table-widget.designer.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTableWidgetDesigner extends AXFWidgetDesigner {

    @ViewChild("table", { static: true }) table: ElementRef<HTMLTableElement>;
    range: Array<number> = [];
    rangeR = 0;
    rangeC = 0;

    constructor(private cdr: ChangeDetectorRef) {
        super();
        for (let i = 1; i <= 10; i++) {
            this.range.push(i);
        }
    }

    onRender() {
        this.applyStyle(this.table.nativeElement);
        this.table.nativeElement.classList.remove('table-picker');
        if (this.widgets.length == 0) {
            this.table.nativeElement.classList.add('table-picker');
        }

        this.cdr.markForCheck();
    }

    onPickerMouseHover(r, c) {
        this.rangeR = r;
        this.rangeC = c;
    }

    onPickeMouseLeave() {
        if (this.rangeR == 1 || this.rangeC == 1) {
            this.rangeR = 0;
            this.rangeC = 0;
        }
    }

    create(r, c) {
        let header: boolean = false;
        for (let ri = 0; ri < r; ri++) {
            let row = this.widgetService.resolve("table-row");
            if (header==false) {
                row.options.isHeader = true;
                header = true;
            }
            let opt = { widgets: [] };
            for (let ci = 0; ci < c; ci++) {
                let cell = this.widgetService.resolve("table-cell");
                opt.widgets.push(cell)
            }
            this.addChild(row, opt)
        }
    }
}

