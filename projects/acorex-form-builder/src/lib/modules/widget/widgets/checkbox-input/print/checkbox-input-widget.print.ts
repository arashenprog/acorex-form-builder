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
    fontSize: string;
    @ViewChild("el", { static: true }) el: ElementRef<HTMLElement>;
    constructor(protected cdr: ChangeDetectorRef) {
        super();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        //this.el.nativeElement.style.textAlign = this.textAlign;
        //this.el.nativeElement.style.display="block";
        if(this.el)
            this.applyStyle(this.el.nativeElement);
        this.cdr.detectChanges();
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

    getSize(font: string) { 
        switch (font) { 
            case 'x-small':
                return 10;
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
                return 40;
        }
    }
}
