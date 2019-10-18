import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

    // @Input()
    // widget: AXFWidgetDesigner;

    delete: EventEmitter<void> = new EventEmitter<void>();
    copy: EventEmitter<void> = new EventEmitter<void>();
    edit: EventEmitter<void> = new EventEmitter<void>();

    allowDelete: boolean = true;
    allowEdit: boolean = true;
    allowMove: boolean = true;
    allowCopy: boolean = true;
}
