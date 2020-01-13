import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild } from '@angular/core';
import { AXMenuComponent, MenuItem, AXHtmlUtil } from 'acorex-ui';

@Component({
    selector: '[axf-widget-toolbox]',
    templateUrl: './widget-toolbox.component.html',
    styleUrls: ['./widget-toolbox.component.scss'],
    host: {
        class: "widget-toolbox-container"
    }
})
export class AXFWidgetToolboxComponent implements OnInit {

    uid: string = AXHtmlUtil.getUID();

    constructor(private el: ElementRef<HTMLDivElement>) {

    }

    ngOnInit(): void {
        this.el.nativeElement.id = this.uid;
    }


    @ViewChild("menu", { static: true }) menu: AXMenuComponent;

    contextMenuItems: MenuItem[] = [
        {
            name: "Copy",
            icon: "fas fa-plus",
            text: "Copy Widget"
        },
        {
            name: "delete",
            icon: "fas fa-trash",
            text: "Delete Widget"
        }
    ]

    onContextItemClick(e: MenuItem) {

        if (e.name == "add") {
            //this.addElement();
        }
        if (e.name == "delete") {
            this.delete.emit();
        }
    }


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
