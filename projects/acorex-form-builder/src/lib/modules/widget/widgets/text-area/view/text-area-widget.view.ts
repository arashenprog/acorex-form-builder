import { Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    selector: "[axf-widget-text]",
    templateUrl: './text-area-widget.view.html', 
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTextAreaWidgetView extends AXFWidgetView {

    text: string;

    
    constructor(private hostElement: ElementRef) {
        super()
    }

    onRender(): void {
        // let el: HTMLElement = (this.hostElement.nativeElement as HTMLElement);
        // this.applyStyle(el);
    }
}
