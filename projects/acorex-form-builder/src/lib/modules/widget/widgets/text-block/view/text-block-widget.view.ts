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
        //
        this.dataService.onChange.subscribe(() => {
            this.refresh();
        });
    }

    onRender(): void {
        this.applyStyle(this.hostElement.nativeElement);
        this.cdr.markForCheck();
    }

    ngDoCheck() {
        if (this.text.startsWith('[$')) {
            this.hostElement.nativeElement.innerHTML =
                this.formatService.format(this.text, true, this.resolveProperty(this.text.substring(2, this.text.length - 1)));
        } else {
            this.hostElement.nativeElement.innerHTML = this.formatService.format(this.text, true, this.config.dataContext);
        }
    }
}
