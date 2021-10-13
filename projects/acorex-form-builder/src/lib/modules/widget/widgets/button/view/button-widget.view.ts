import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    selector: '[axf-button]',
    templateUrl: './button-widget.view.html',
    styleUrls: ['./button-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFButtonWidgetView extends AXFWidgetView {


    type: string;
    text: string;
    size: string;


    constructor(private hostElement: ElementRef<HTMLDivElement>) {
        super();
    }

    onRender(): void {
        this.applyStyle(this.hostElement.nativeElement);
    }



    handleClickEvent(e: MouseEvent) {
        this.invokeEvent("onClick");
    }
}

