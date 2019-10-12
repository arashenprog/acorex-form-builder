import { Component, ViewEncapsulation } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';

@Component({
    selector: "axf-widget-row",
    templateUrl: './row-widget.designer.html',
    styleUrls: ['./row-widget.designer.scss'],
    providers: [{ provide: AXFWidgetDesigner, useExisting: AXFRowWidgetDesigner }]
})
export class AXFRowWidgetDesigner extends AXFWidgetDesigner {

    maxCol: number = 12;
    minCol: number = 2;
    countCol: number = 6;
    colLeft: number[] = [];
    range: number = 0;


    constructor(
    ) {
        super()

        this.calcLeftCols();
    }


    addColumn(...cols) {
        cols.forEach(c => {
            this.appendChild("col", { size: c * this.minCol });
        });
        this.calcLeftCols();
    }

    private calcLeftCols() {
        debugger;
        this.countCol = this.maxCol / this.minCol;
        const sum = this.widgets.map(c => c.options.size).reduce((a, b) => a + b, 0);
        this.range = 0;
        this.colLeft = Array(this.countCol - (sum / this.minCol)).fill(1);
    }

    refresh() {
        this.calcLeftCols();
    }

    handlePickerMouseHover(range: number) {
        this.range = range;
    }

    handlePickerMouseOut(range: number) {
        if (this.range == range)
            this.range = 0;
    }



}
