import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, Input, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';


@Component({
    selector: "[axf-widget-text]",
    templateUrl: './text-block-widget.designer.html',
    styleUrls: ['./text-block-widget.designer.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTextBlockWidgetDesigner extends AXFWidgetDesigner {
    text: String;
    constructor(
        private hostElement: ElementRef,
        private cdr: ChangeDetectorRef
    ) {
        super()
    }
    onRender(): void {
        let el: HTMLElement = (this.hostElement.nativeElement as HTMLElement);
        this.applyStyle(el);
        this.cdr.markForCheck();
    }
}
