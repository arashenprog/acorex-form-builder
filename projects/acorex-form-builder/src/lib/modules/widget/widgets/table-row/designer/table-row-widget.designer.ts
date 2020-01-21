import { Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { AXFWidgetDesigner, AXFContextMenuItem } from '../../../config/widget';
import { WidgetConfig } from '../../../services/widget.service';

@Component({
    selector: 'tr',
    templateUrl: './table-row-widget.designer.html',
    styleUrls: ['./table-row-widget.designer.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AXFTableRowWidgetDesigner extends AXFWidgetDesigner {

    constructor(
        private el: ElementRef,
        private cdr: ChangeDetectorRef) {
        super();
    }

    onRender() {
        this.applyStyle(this.el.nativeElement);
        this.cdr.markForCheck();
    }

    getContextMenu() {
        const items: AXFContextMenuItem[] = [];
        items.push({
            text: "Insert row above",
            icon: "fas fa-chevron-up",
            action: "insertRowBefore"
        });
        items.push({
            text: "Insert row below",
            icon: "fas fa-chevron-down",
            action: "insertRowAfter"
        });
        items.push({
            text: "Delete",
            separator: true,
            action: "delete",
            icon: "fas fa-trash"
        });
   
        return items;
    }

    insertRowBefore() {
        this.insertRow(0);
    }



    insertRowAfter() {
        this.insertRow(1);
    }

    private insertRow(i: number) {
        const index = this.findIndex();
        let row = this.widgetService.resolve("table-row");
        row.options = { widgets: [] };
        this.getColumns(index).forEach(col => {
            row.options.widgets.push(col);
        });
        this.parent.widgets.splice(index + i, 0, row);
        this.refresh();
    }

    private getColumns(index: number): WidgetConfig[] {
        const result: WidgetConfig[] = [];
        const currentRow = this.parent.widgets[index];
        currentRow.options.widgets.forEach(col => {
            result.push(this.widgetService.clone(col));
        });
        return result;

    }
}

