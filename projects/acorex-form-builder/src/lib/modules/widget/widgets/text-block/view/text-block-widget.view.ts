import { Component, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { AXFFormatService } from '../../../services/format.service';

@Component({
    template: '',
    selector: "[axf-widget-text]",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTextBlockWidgetView extends AXFWidgetView {

    text: string;


    constructor(
        private hostElement: ElementRef<HTMLDivElement>,
        private cdr: ChangeDetectorRef,
        private formatService: AXFFormatService) {
        super();
    }

    onRender(): void {
        this.hostElement.nativeElement.innerHTML = this.formatService.format(this.text, true, this.config.dataContext);
        this.applyStyle(this.hostElement.nativeElement);
        this.cdr.markForCheck();
    }
}
