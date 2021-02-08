import { Component, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { AXFFormatService } from '../../../services/format.service';
import { Subscription } from 'rxjs';

@Component({
    template: '',
    selector: "[axf-widget-text]",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTextBlockWidgetView extends AXFWidgetView {

    text: string;
    private dataSubscription: Subscription;


    constructor(
        private hostElement: ElementRef<HTMLDivElement>,
        private cdr: ChangeDetectorRef,
        private formatService: AXFFormatService) {
        super();
        //
        this.dataSubscription = this.dataService.onChange.subscribe((data) => {
            this.hostElement.nativeElement.innerHTML = this.formatService.format(this.text, this);
        });
    }

    onRender(): void {
        this.applyStyle(this.hostElement.nativeElement);
        this.hostElement.nativeElement.style.display=this.visible?"block":"none";
        this.cdr.markForCheck();
    }

    ngOnInit() {
        super.ngOnInit();
        this.hostElement.nativeElement.innerHTML = this.formatService.format(this.text, this);
    }

    ngOnDestroy() {
        this.dataSubscription.unsubscribe();
        super.ngOnDestroy();
    }
 
}
