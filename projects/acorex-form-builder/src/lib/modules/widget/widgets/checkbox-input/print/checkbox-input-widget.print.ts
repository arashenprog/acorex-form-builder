import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    templateUrl: './checkbox-input-widget.print.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFCheckboxInputWidgetPrint extends AXFWidgetPrint {

    label: string;
    size: number = 20;
    textAlign:string;
    @ViewChild("el") el: ElementRef<HTMLElement>;
    constructor(protected cdr: ChangeDetectorRef) {
        super();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        //this.el.nativeElement.style.textAlign = this.textAlign;
        //this.el.nativeElement.style.display="block";
        this.applyStyle(this.el.nativeElement);
        this.cdr.markForCheck();
    }

    onRender(): void {
        if (this.label.match(/\[(.*?)\]/g) && this['rIndex'] >= 0 && this['dataContext'] != undefined) {
            this.label.match(/\[(.*?)\]/g).forEach(f => {
                let sw = f.substring(1, f.length - 1);
                if (this['dataContext'].hasOwnProperty(sw)) {
                    this.label = this.label.replace(f, this['dataContext'][sw]);
                    this.cdr.markForCheck();
                }
            });
        } 
        
    }

 
}
