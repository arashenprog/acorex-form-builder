import { Component, OnInit, ElementRef } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    templateUrl: './date-input-widget.view.html',
    styleUrls: ['./date-input-widget.view.scss']
})
export class AXFDateInputWidgetView extends AXFWidgetView {


    
    constructor(private el: ElementRef<HTMLElement>){
        super()
    }
    

    onRender(): void {
        
    }
}
