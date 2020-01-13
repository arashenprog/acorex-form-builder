import { Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXFWidgetPickerService } from '../../../services/template/picker.service';
import { AXMenuComponent, MenuItem } from 'acorex-ui';

@Component({
    selector: 'td',
    templateUrl: './table-cell-widget.designer.html',
    styleUrls: ['./table-cell-widget.designer.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: "axf-drop-zone"
    }
})
export class AXFTableCellWidgetDesigner extends AXFWidgetDesigner {


    @ViewChild(AXMenuComponent, { static: true }) menu: AXMenuComponent;

    constructor(
        private el: ElementRef<HTMLTableCellElement>,
        private picker: AXFWidgetPickerService,
        private cdr: ChangeDetectorRef) {
        super();
    }

    onRender() {
        this.applyStyle(this.el.nativeElement);
        if (this["colspan"]) {
            this.el.nativeElement.colSpan = this["colspan"];
        }
        if (this["rowspan"]) {
            this.el.nativeElement.rowSpan = this["rowspan"];
        }
        this.cdr.markForCheck();
    }

    addElement() {
        this.picker.showPicker().then(widgets => {
            if (widgets) {
                widgets.forEach(w => {
                    this.addChild(w);
                });
            }
        })
    }

    contextMenuItems: MenuItem[] = [
        {
            name: "add",
            icon: "fas fa-plus",
            text: "Add Widget"
        },
        {
            name: "delete",
            icon: "fas fa-trash",
            text: "Delete Widget"
        }
    ]

    onContextItemClick(e: MenuItem) {

        if (e.name == "add") {
            this.addElement();
        }
        if (e.name == "delete") {
            this.delete();
        }
    }
}

