import { Component, OnInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    templateUrl: './text-input-widget.view.html',
    styleUrls: ['./text-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTextInputWidgetView extends AXFWidgetView {

    text: String;
    placeholder: String;


    constructor(private el: ElementRef<HTMLElement>) {
        super()
    }


    onRender(): void {
        // let s = this.el.nativeElement.querySelector<HTMLFieldSetElement>("fieldset");
        // s.style.visibility = "hidden";
        // s.style.display = "none";
        // this.applyStyle(this.el.nativeElement.querySelector("input"));
    }
}
