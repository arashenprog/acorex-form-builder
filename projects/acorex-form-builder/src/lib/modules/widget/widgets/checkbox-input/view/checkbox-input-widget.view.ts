import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetView, AXFValueWidgetView } from '../../../config/widget';

@Component({
    templateUrl: './checkbox-input-widget.view.html',
    styleUrls: ['./checkbox-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFCheckboxInputWidgetView extends AXFValueWidgetView {

    textAlign: string;
    label: string;
    constructor(private el: ElementRef<HTMLElement>, protected cdr: ChangeDetectorRef) {
        super(cdr);
    }


    onRender(): void {
        if (this.label.match(/\[(.*?)\]/g) && this['rIndex'] >= 0 && this['dataContext'] != undefined) {
            this.label.match(/\[(.*?)\]/g).forEach(f => {
                let sw = f.substring(1, f.length - 1);
                if (this['dataContext'].hasOwnProperty(sw)) {
                    this.label = this.label.replace(f, this['dataContext'][sw]);
                    this.cdr.detectChanges();
                }
            });
        }
        this.cdr.detectChanges();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.el.nativeElement.style.textAlign = this.textAlign;
        this.el.nativeElement.style.display = "block";
        this.applyStyle(this.el.nativeElement.querySelector("label"));
        if (this.el.nativeElement != null) {
            this.el.nativeElement.querySelector("span").style.width = `${this.getSize(this["fontSize"])}px`;
            this.el.nativeElement.querySelector("span").style.height = `${this.getSize(this["fontSize"])}px`;
            if (this.label && this.label != "") {
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
        this.cdr.detectChanges();


    }

    getSize(font: string) {
        switch (font) {
            case 'x-small':
                return 10;
            case 'smaller':
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
                return 40;
        }
    }
}
