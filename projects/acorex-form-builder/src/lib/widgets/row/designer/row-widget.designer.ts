import { Component, OnInit, ContentChildren, QueryList } from '@angular/core';
import { AXFWidgetDesigner } from '../../widget';

@Component({
    selector: "axf-widget-row",
    templateUrl: './row-widget.designer.html',
    styleUrls: ['./row-widget.designer.scss'],
    providers: [{ provide: AXFWidgetDesigner, useExisting: AXFRowWidgetDesigner }]
})
export class AXFRowWidgetDesigner extends AXFWidgetDesigner {

    constructor(
    ) {
        super()
    }


    AddColumn(...cols) {
        cols.forEach(c => {
            this.appendChild("col", { size: c });
        });
    }
}
