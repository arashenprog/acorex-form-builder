import { Component, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';

@Component({
    selector: "[axf-widget-row]",
    templateUrl: './row-widget.designer.html',
    styleUrls: ['./row-widget.designer.scss'],
    providers: [{ provide: AXFWidgetDesigner, useExisting: AXFRowWidgetDesigner }]
})
export class AXFRowWidgetDesigner extends AXFWidgetDesigner {

    maxCol: number = 12;
    minCol: number = 1;
    countCol: number = 12;
    colLeft: number[] = [];
    range: number = 0;


    @ViewChild("el") el: ElementRef;



    constructor(private hostElement: ElementRef) {
        super()
        this.calcLeftCols();
    }



    addColumn(...cols) {
        cols.forEach(c => {
            this.widgetService.addWidget("col", this, { size: c * this.minCol });
        });
        this.refresh();
    }

    private calcLeftCols() {
        this.countCol = this.maxCol / this.minCol;
        const sum = this.widgets.map(c => c.options.size).reduce((a, b) => a + b, 0);
        this.range = 0;
        this.colLeft = Array(this.countCol - (sum / this.minCol)).fill(1);
    }



    onRender() {
        this.applyStyle(this.el.nativeElement);
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
