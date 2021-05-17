import { Component, OnInit, ViewEncapsulation, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';


@Component({
    selector: "[axf-widget-checkbox]",
    templateUrl: './checkbox-input-widget.designer.html',
    styleUrls: ['./checkbox-input-widget.designer.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFCheckboxInputWidgetDesigner extends AXFWidgetDesigner {

    textAlign: string;
    defaultValue: boolean;
    label: string;
    constructor(private el: ElementRef<HTMLElement>, private cdr: ChangeDetectorRef) {
        super()
    }

    onRender(): void {
        this.el.nativeElement.style.textAlign = this.textAlign;
        this.applyStyle(this.el.nativeElement.querySelector("label"));
        if (this.el.nativeElement != null) {
            this.el.nativeElement.querySelector("span").style.width = `${this.getSize(this["fontSize"])}px`;
            this.el.nativeElement.querySelector("span").style.height = `${this.getSize(this["fontSize"])}px`;
            if (this.label && this.label!="") {
                if (document.getElementsByClassName("ltr").length > 0)
                    this.el.nativeElement.querySelector("label").style.paddingLeft = `${this.getSize(this["fontSize"]) + 5}px`;
                else
                    this.el.nativeElement.querySelector("label").style.paddingRight = `${this.getSize(this["fontSize"]) + 5}px`;
                (this.el.nativeElement.querySelector("ax-check-box") as HTMLElement).style.display = "inline-block";
            }
            else
               (this.el.nativeElement.querySelector("ax-check-box") as HTMLElement).style.display = "initial";
            (this.el.nativeElement.querySelector("ax-check-box") as HTMLElement).style.paddingBottom = `${this.getSize(this["fontSize"]) < 15 ? 0 : this.getSize(this["fontSize"]) - 15}px`;
            (this.el.nativeElement.querySelector("ax-check-box") as HTMLElement).style.backgroundColor = this['bgColor'];
        }
        this.cdr.markForCheck();
    }

    getSize(font: string) {
        switch (font) {
            case 'xx-small':
            case 'x-small':
                return 12;
            case 'smaller':
            case 'inherit':
                return 15;
            case 'small':
                return 20;
            case 'medium':
                return 25;
            case 'large':
                return 30;
            case 'larger':
                return 35;
            case 'x-large':
            case 'xx-large':
                return 40;
        }
    }
}
