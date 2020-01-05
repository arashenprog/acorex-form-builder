import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    templateUrl: './text-input-widget.view.html',
    styleUrls: ['./text-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTextInputWidgetView extends AXFWidgetView {

    placeholder: String;


    constructor(private cdr: ChangeDetectorRef) {
        super()
    }


    onRender(): void {
        this.cdr.markForCheck();
    }
}
