import { Component, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { AXFFormatService } from '../../../services/format.service';

@Component({
    template:'',
    selector: '[axf-text-block]',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTextBlockWidgetPrint extends AXFWidgetPrint {

    text: string;

    constructor(private hostElement: ElementRef,private cdr:ChangeDetectorRef,
        private formatService: AXFFormatService) {
        super();
    }

    onRender(): void {
        this.applyStyle(this.hostElement.nativeElement);
        this.cdr.markForCheck();
    }

    ngOnInit() {
        super.ngOnInit();
        this.hostElement.nativeElement.innerHTML = this.formatService.format(this.text, this);
        if(this["tag"])
        {
            this.hostElement.nativeElement.setAttribute("role",this["tag"]); 
        }
    }
}
