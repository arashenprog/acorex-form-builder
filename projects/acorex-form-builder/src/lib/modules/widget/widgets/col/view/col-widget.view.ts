import { Component, OnInit, ElementRef, HostBinding } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    templateUrl: './col-widget.view.html',
    styleUrls: ['./col-widget.view.scss']
})
export class AXFColWidgetView extends AXFWidgetView {


    size: number;
    @HostBinding("style.color")
    color: string;

    @HostBinding("style.background")
    bgColor: string;


    constructor(private hostElement: ElementRef) {
        super()
    }

    ngOnInit(): void {
        (this.hostElement.nativeElement as HTMLElement).classList.add("col-sm-12", `col-md-${this.size}`)
    }
}
