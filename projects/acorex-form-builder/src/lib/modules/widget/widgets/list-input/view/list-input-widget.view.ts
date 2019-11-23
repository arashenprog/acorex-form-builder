import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    templateUrl: './list-input-widget.view.html',
    styleUrls: ['./list-input-widget.view.scss']
})
export class AXFListInputWidgetView extends AXFWidgetView {

    @ViewChild("el") el: ElementRef<HTMLElement>;

    value:string[];
    items:{ContenView:string[],Content:any[],ShowOther:boolean};
    mode:string;
    direction:string;
    fillBy:string;
    alignCheck:string;

    constructor() {
        super()
    }

    onRender(): void {
        this.applyStyle(this.el.nativeElement);
    }

    handleValueChange(e)
    {

    }

    getStyles(mode) { 
        const styles = { 
            'border-radius': mode == 'single' ? 100+"%" : 0 
        };
        return styles;
    }
}
