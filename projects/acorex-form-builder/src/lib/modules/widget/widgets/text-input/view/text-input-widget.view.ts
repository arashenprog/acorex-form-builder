import { Component, OnInit, ElementRef } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    templateUrl: './text-input-widget.view.html',
    styleUrls: ['./text-input-widget.view.scss']
})
export class AXFTextInputWidgetView extends AXFWidgetView {

    text: String;

    
    constructor(private el: ElementRef<HTMLElement>){
        super()
    }

    ngOnInit(): void {
        let s = this.el.nativeElement.querySelector<HTMLFieldSetElement>("fieldset");
        s.style.visibility = "hidden";
        s.style.display = "none";
        this.applyStyle(this.el.nativeElement.querySelector("input"));
    }
}
