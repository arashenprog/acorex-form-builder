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

    delete: EventEmitter<void> = new EventEmitter<void>();
    copy: EventEmitter<void> = new EventEmitter<void>();
    edit: EventEmitter<void> = new EventEmitter<void>();
    move: EventEmitter<void> = new EventEmitter<void>();

    allowDelete: boolean = true;
    allowEdit: boolean = true;
    allowMove: boolean = true;
    allowCopy: boolean = true;

    handleAction(action: string, e: MouseEvent) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        switch (action) {
            case "edit":
                this.edit.emit();
                break;
            case "delete":
                this.delete.emit();
                break;
            case "copy":
                this.delete.emit();
                break;
            case "move":
                this.move.emit();
                break;
        }
        return false;
    }
}
