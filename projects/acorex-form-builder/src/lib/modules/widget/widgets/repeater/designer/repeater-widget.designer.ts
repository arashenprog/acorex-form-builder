import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { WidgetConfig } from '../../../services/widget.service';

@Component({
    selector: "[axf-repeater]",
    templateUrl: './repeater-widget.designer.html',
    styleUrls: ['./repeater-widget.designer.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFRepeaterWidgetDesigner extends AXFWidgetDesigner {

    @ViewChild("table", { static: true }) table: ElementRef<HTMLTableElement>;

    private _showHeader: boolean;
    public get showHeader(): boolean {
        return this._showHeader;
    }
    public set showHeader(v: boolean) {
        if (v != this._showHeader) {
            this._showHeader = v;
            if (v == true) {
                if (!this.widgets.some(c => c.options.isHeader == true)) {
                    let head = this.widgetService.resolve("table-row");
                    head.options.isHeader = true;
                    let opthead = { widgets: [] };
                    let cell = this.widgetService.resolve("table-cell");

                    let optheadCell = { widgets: [] };
                    let txtblock = this.widgetService.resolve("text");
                    optheadCell.widgets.push(txtblock);
                    Object.assign(cell.options, optheadCell);
                    //this.addChild(cell, optheadCell); 

                    opthead.widgets.push(cell);
                    this.addChild(head, opthead);
                    this.cdr.markForCheck();
                }
            }
            else {
                let headindex = this.widgets.findIndex(d => d.options.isHeader == true);
                if (headindex > -1) {
                    this.widgets.splice(headindex, 1);
                    this.cdr.markForCheck();
                }
            }

        }
    }


    constructor(
        private cdr: ChangeDetectorRef) {
        super()
    }

    onRender() {
        this.applyStyle(this.table.nativeElement);
        this.cdr.markForCheck();
    }

    ngOnInit() {
        if (this.widgets.length == 0) {
            let row = this.widgetService.resolve("table-row");
            row.options.isHeader = false;
            let opt = { widgets: [] };
            for (let ci = 0; ci < 1; ci++) {
                let cell = this.widgetService.resolve("table-cell");
                opt.widgets.push(cell)
            }
            this.addChild(row, opt);
            this.cdr.markForCheck();
        }
    }

    getHeader() {
        return this.widgets.filter(c => c.options.isHeader == true);
    }

    getBody() {
        return this.widgets.filter(c => c.options.isHeader == false);
    }
    // onPickerMouseHover(r, c) {
    //     this.rangeR = r;
    //     this.rangeC = c;
    // }

    // onPickeMouseLeave() {
    //     if (this.rangeR == 1 || this.rangeC == 1) {
    //         this.rangeR = 0;
    //         this.rangeC = 0;
    //     }
    // }

    // create(r, c) {
    //     let header: boolean = false;
    //     for (let ri = 0; ri < r; ri++) {
    //         let row = this.widgetService.resolve("table-row");
    //         if (header==false) {
    //             row.options.isHeader = true;
    //             header = true;
    //         }
    //         let opt = { widgets: [] };
    //         for (let ci = 0; ci < c; ci++) {
    //             let cell = this.widgetService.resolve("table-cell");
    //             opt.widgets.push(cell)
    //         }
    //         this.addChild(row, opt)
    //     }
    // }
}
