import { Component, ViewEncapsulation, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';

@Component({
    selector: "[axf-widget-row]",
    templateUrl: './row-widget.designer.html',
    styleUrls: ['./row-widget.designer.scss'],
    providers: [{ provide: AXFWidgetDesigner, useExisting: AXFRowWidgetDesigner }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: "row" }
})
export class AXFRowWidgetDesigner extends AXFWidgetDesigner {

    maxCol: number = 12;
    minCol: number = 1;
    countCol: number = 12;
    colLeft: number[] = [];
    range: number = 0;



    constructor(private hostElement: ElementRef, private cdr: ChangeDetectorRef) {
        super()
        this.calcLeftCols();
    }



    addColumn(...cols) {
        cols.forEach(c => {
            let w = this.widgetService.resolve("col");
            this.addChild(w, { size: c * this.minCol })
        });
    }

    private calcLeftCols() {
        this.countCol = this.maxCol / this.minCol;
        const sum = this.widgets.map(c => c.options.size).reduce((a, b) => Number(a) + Number(b), 0);
        this.range = 0;
        this.colLeft = Array(this.countCol - (sum / this.minCol)).fill(1);
    }



    onRender() {
        this.applyStyle(this.hostElement.nativeElement);
        this.calcLeftCols();
        this.cdr.markForCheck();
    }

    handlePickerMouseHover(range: number) {
        this.range = range;
    }

    handlePickerMouseOut(range: number) {
        if (this.range == range)
            this.range = 0;
    }

    handleAction(action: string, e: MouseEvent, params?: any) {
        e.stopPropagation();
        switch (action) {
            case "edit":
                this.edit();
                break;
            case "delete":
                this.delete();
                break;
            case "add":
                this.addColumn(params)
                break;
        }
        return false;
    }



}
