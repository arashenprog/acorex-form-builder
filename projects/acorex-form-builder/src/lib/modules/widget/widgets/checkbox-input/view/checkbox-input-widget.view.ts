import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetView, AXFValueWidgetView } from '../../../config/widget';

@Component({
    templateUrl: './checkbox-input-widget.view.html',
    styleUrls: ['./checkbox-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFCheckboxInputWidgetView extends AXFValueWidgetView {

    textAlign:string;
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
        this.el.nativeElement.style.display="block";
        this.applyStyle(this.el.nativeElement.querySelector("label")); 
        this.cdr.detectChanges();
    }
}
