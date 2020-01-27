import { Component, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { AXFWordPipe } from '../../../pipes/word.pipe';

@Component({
    template: '',
    selector: "[axf-widget-text]",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTextBlockWidgetView extends AXFWidgetView {

    text: string;


    constructor(private hostElement: ElementRef<HTMLDivElement>, private cdr: ChangeDetectorRef,private wordPipe:AXFWordPipe) {
        super();
    }

    onRender(): void {
        this.hostElement.nativeElement.innerHTML =this.wordPipe.transform(this.text);
        this.applyStyle(this.hostElement.nativeElement);
        this.cdr.markForCheck();
    }
}
