import { Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ViewEncapsulation, HostListener, NgZone } from '@angular/core';
import { AXFWidgetDesigner, AXFContextMenuItem } from '../../../config/widget';
import { AXFWidgetPickerService } from '../../../services/template/picker.service';

@Component({
    selector: 'td',
    templateUrl: './table-cell-widget.designer.html',
    styleUrls: ['./table-cell-widget.designer.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None

})
export class AXFTableCellWidgetDesigner extends AXFWidgetDesigner {

    constructor(
        private el: ElementRef<HTMLTableCellElement>,
        private picker: AXFWidgetPickerService,
        private zone: NgZone,
        private cdr: ChangeDetectorRef) {
        super();
    }

    onRender() {
        this.applyStyle(this.el.nativeElement);
        if (this['colspan']) {
            this.el.nativeElement.colSpan = this['colspan'];
        }
        if (this['rowspan']) {
            this.el.nativeElement.rowSpan = this['rowspan'];
        }
        this.cdr.markForCheck();
    }


    getContextMenu() {
        const items: AXFContextMenuItem[] = super.getContextMenu().filter(c =>
            c.action !== 'copy' &&
            c.action !== 'addElementBefore' &&
            c.action !== 'addElementAfter' &&
            c.action !== 'moveUp' &&
            c.action !== 'moveDown'
        );
        items.splice(3, 0, ...[
            {
                text: 'Column',
                icon: 'fas fa-columns',
                widget: this,
                items: [

                    {
                        text: 'Insert column before',
                        action: 'insertColumnBefore',
                        icon: 'fas fa-chevron-left',
                        widget: this
                    },
                    {
                        text: 'Insert column after',
                        action: 'insertColumnAfter',
                        icon: 'fas fa-chevron-right',
                        widget: this
                    },
                    {
                        text: 'Delete column',
                        icon: 'fas fa-trash',
                        action: 'deleteColumn',
                        widget: this
                    },
                ]
            },
            {
                text: 'Merge',
                icon: 'fas fa-object-group',
                widget: this,
                items: [
                    {
                        text: 'Merge with next',
                        icon: 'fas fa-chevron-right',
                        action: 'mergeAfter',
                    },
                    {
                        text: 'Merge with blow',
                        icon: 'fas fa-chevron-down',
                        action: 'mergeBelow',
                    },
                ],
                separator: true,
            }
        ]);
        return items;
    }

    insertColumnBefore() {
        this.insertColumn(0);
    }
    insertColumnAfter() {
        this.insertColumn(1);
    }

    private insertColumn(index: number) {
        const table = this.parent.parent;
        table.widgets.forEach(row => {
            const col = this.widgetService.resolve('table-cell');
            row.options.widgets.splice(this.findIndex() + index, 0, col);
            row.componentRef.refresh();
        });
    }

    private deleteColumn() {
        const table = this.parent.parent;
        table.widgets.forEach(row => {
            row.options.widgets.splice(this.findIndex(), 1);
            row.componentRef.refresh();
        });
    }

    private mergeAfter() {
        let colspan = Number(this.config.options.colspan);
        if (!colspan) {
            colspan = 1;
        }

        const nextCol = this.parent.widgets[this.findIndex() + 1];
        if (nextCol) {
            this.config.options.colspan = ++colspan;
            this.config.options.widgets.push(...nextCol.options.widgets);
            this.parent.config.options.widgets.splice(this.findIndex() + 1, 1);
            this.refresh();
        }
    }

    private mergeBelow() {
        let rowspan = Number(this.config.options.rowspan);
        if (!rowspan) {
            rowspan = 1;
        }
        const nextRow = this.parent.parent.widgets[this.parent.findIndex() + 1];
        if (nextRow) {
            this.config.options.rowspan = ++rowspan;
            //this.config.options.widgets.push(...nextCol.options.widgets);
            //this.parent.config.options.widgets.splice(this.findIndex() + 1, 1);
            this.refresh();
        }
    }

    // private dragMode: number = 0;
    // private oldX: number = 0;
    // private oldY: number = 0;
    // onResizeMouseDown(e: MouseEvent, m) {
    //     e.preventDefault();
    //     this.dragMode = m;
    //     this.oldX = e.x;
    //     this.oldY = e.y;
    // }

    // @HostListener('window:mouseup')
    // onMouseup(e: MouseEvent) {
    //     this.dragMode = 0;
    //     //this.refresh();
    //     this.edit();
    // }

    // @HostListener('window:mousemove', ['$event'])
    // onMousemove(e: MouseEvent) {
    //     this.zone.runOutsideAngular(() => {
    //         e.preventDefault();
    //         if (this.dragMode != 0) {
    //             const movX = e.x - this.oldX;
    //             const movY = e.y - this.oldY;
    //             this.oldX = e.x;
    //             this.oldY = e.y;
    //             if (this.dragMode == -1) {
    //                 let width = Number(this.config.options.width);
    //                 if (!width)
    //                     width =  this.el.nativeElement.getBoundingClientRect().width;
    //                 width += movX;
    //                 console.log(movX, width);
    //                 this.config.options.width = width;
    //                 this.el.nativeElement.style.width = `${width}px`
    //             }
    //             if (this.dragMode == 1) {
    //                 // if (!this.currentCell.style.height)
    //                 //     this.currentCell.style.height = this.initCellHeight;
    //                 // this.currentCell.style.height += movY;
    //                 // if (this.currentCell.style.height < this.initCellHeight)
    //                 //     this.currentCell.style.height = this.initCellHeight;
    //                 // this.value[this.currentCell.i].forEach(cell => {
    //                 //     cell.style.height = this.currentCell.style.height;
    //                 // });
    //             }
    //         }
    //     });

    // }

}

