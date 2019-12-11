import { Component, OnInit, Input } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    selector: '[axf-outlet]',
    templateUrl: './outlet-widget.view.html',
    styleUrls: ['./outlet-widget.view.scss']
})
export class AXFOutletWidgetView extends AXFWidgetView {
    constructor() {
        super();
     }

    ngOnInit(): void { }

    @Input()
    public get value(): any {
        return "Arash";
    }
  
    
}

