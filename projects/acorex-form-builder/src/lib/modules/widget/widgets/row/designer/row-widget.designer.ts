import { Component, ViewEncapsulation } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';

@Component({
    selector: "axf-widget-row",
    templateUrl: './row-widget.designer.html',
    styleUrls: ['./row-widget.designer.scss'],
    providers: [{ provide: AXFWidgetDesigner, useExisting: AXFRowWidgetDesigner }]
})
export class AXFRowWidgetDesigner extends AXFWidgetDesigner {


    colLeft: number[] = Array(4).fill(1);
    range: number = 0;


    constructor(
    ) {
        super()
    }


    AddColumn(...cols) {
        debugger;
        cols.forEach(c => {
            this.appendChild("col", { size: c });
        });
        this.calcLeftCols();
    }

    private calcLeftCols()
    {
        const sum = this.widgets.map(c => c.options.size).reduce((a, b) => a + b, 0);
        this.range = 0;
        this.colLeft = Array(4 - (sum / 3)).fill(1);
    }

    refresh()
    {
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
