import { Component, OnInit, Input } from '@angular/core';
import { AXFWidgetDesigner } from '../../config/widget';

@Component({
    selector: '[axf-widget-toolbox]',
    templateUrl: './widget-toolbox.component.html',
    styleUrls: ['./widget-toolbox.component.scss'],
    host: {
        class: "widget-toolbox-container"
    }
})
export class AXFWidgetToolboxComponent implements OnInit {
    constructor() { }
    ngOnInit(): void { }

    @Input()
    widget: AXFWidgetDesigner;
}
