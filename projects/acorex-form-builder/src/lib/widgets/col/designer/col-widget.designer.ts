import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2 } from '@angular/core';
import { AXFWidgetDesigner } from '../../widget';

@Component({
    selector: "[axf-widget-col]",
    templateUrl: './col-widget.designer.html',
    styleUrls: ['./col-widget.designer.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AXFColWidgetDesigner extends AXFWidgetDesigner {
    size: number = 1;

    constructor(private hostElement: ElementRef) {
        super()

    }
    ngOnInit(): void {
        (this.hostElement.nativeElement as HTMLElement).classList.add("axf-col", "col-sm-12", `col-md-${this.size}`)
    }

    AddRow() {
        this.appendChild("row");
    }
}
