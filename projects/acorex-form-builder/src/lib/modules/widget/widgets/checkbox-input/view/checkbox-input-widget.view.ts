import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { $ } from 'protractor';
import { AXFWidgetView, AXFValueWidgetView } from '../../../config/widget';

@Component({
    templateUrl: './checkbox-input-widget.view.html',
    styleUrls: ['./checkbox-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFCheckboxInputWidgetView extends AXFValueWidgetView {

    textAlign: string;
    label: string;
    color: string;
    bgColor: string; 
    fontSize: string;
    defaultValue: boolean;
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
        if (this.value == undefined && this.defaultValue != undefined) {
            this.value = this.defaultValue;
        }
        if(this.el)
        this.applyStyle(this.el.nativeElement);
        this.cdr.detectChanges();
    }  

    getSize(font: string) {
        switch (font) {
            case 'x-small':
            case 'xx-small':
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

    onCheckValueChange() {
        if (this.readonly) {
            return;
        }
        this.value = !this.value;
    }
}
