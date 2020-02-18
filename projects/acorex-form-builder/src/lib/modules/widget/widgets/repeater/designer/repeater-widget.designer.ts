import { Component, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';

@Component({
    selector: '[axf-repeater]',
    templateUrl: './repeater-widget.designer.html',
    styleUrls: ['./repeater-widget.designer.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFRepeaterWidgetDesigner extends AXFWidgetDesigner {

    @ViewChild('table', { static: true }) table: ElementRef<HTMLTableElement>;

    private _showHeader: boolean;
    public get showHeader(): boolean {
        return this._showHeader;
    }
    public set showHeader(v: boolean) {
        if (v !== this._showHeader) {
            this._showHeader = v;
            if (v === true) {
                if (!this.widgets.some(c => c.options.isHeader === true)) {
                    const head = this.widgetService.resolve('table-row');
                    head.options.isHeader = true;
                    const opthead = { widgets: [] };
                    const cell = this.widgetService.resolve('table-cell');

                    const optheadCell = { widgets: [] };
                    const txtblock = this.widgetService.resolve('text');
                    optheadCell.widgets.push(txtblock);
                    Object.assign(cell.options, optheadCell);
                    // this.addChild(cell, optheadCell);

                    opthead.widgets.push(cell);
                    this.addChild(head, opthead);
                    this.cdr.markForCheck();
                }
            } else {
                const headindex = this.widgets.findIndex(d => d.options.isHeader == true);
                if (headindex > -1) {
                    this.widgets.splice(headindex, 1);
                    this.cdr.markForCheck();
                }
            }

        }
    }


    constructor(
        private cdr: ChangeDetectorRef) {
        super();
    }

    onRender() {
        this.applyStyle(this.table.nativeElement);
        this.cdr.markForCheck();
    }

    ngOnInit() {
        if (this.widgets.length == 0) {
            const row = this.widgetService.resolve('table-row');
            row.options.isHeader = false;
            const opt = { widgets: [] };
            for (let ci = 0; ci < 1; ci++) {
                const cell = this.widgetService.resolve('table-cell');
                opt.widgets.push(cell)
            }
            this.addChild(row, opt);
            this.cdr.markForCheck();
        }
    }

    getHeader() {
        return this.widgets.filter(c => c.options.isHeader === true);
    }

    getBody() {
        return this.widgets.filter(c => c.options.isHeader === false);
    }
}
