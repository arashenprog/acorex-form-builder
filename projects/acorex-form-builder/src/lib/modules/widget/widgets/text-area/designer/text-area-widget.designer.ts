import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, Input, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget'; 

@Component({
    selector: "[axf-widget-text]",
    templateUrl: './text-area-widget.designer.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFTextAreaWidgetDesigner extends AXFWidgetDesigner {

    @ViewChild("el", { static: true }) el: ElementRef<HTMLElement>;

    text: String;
    placeholder: String;

    constructor(private cdr: ChangeDetectorRef) {
        super()
    }

    onRender(): void {
        // let s = this.el.nativeElement.querySelector<HTMLFieldSetElement>("fieldset");
        // s.style.visibility = "hidden";
        // s.style.display = "none";
        // this.applyStyle(this.el.nativeElement.querySelector("input"));
         this.cdr.markForCheck();
    }

}
