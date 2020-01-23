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

    getContextMenu() {
        const items: AXFContextMenuItem[] = super.getContextMenu().filter(c => c.action != "copy");
        items.splice(3, 0, ...[
            {
                text: "Column",
                icon: "fas fa-columns",
                widget: this,
                items: [
                    {
                        text: "Insert column before",
                        action: "insertColumnBefore",
                        widget: this
                    },
                    {
                        text: "Insert column after",
                        action: "insertColumnAfter",
                        widget: this
                    },
                ]
            },
            {
                text: "Merge",
                icon: "fas fa-object-group",
                widget: this,
                items: [
                    {
                        text: "Merge with next",
                        action: "mergeAfter",
                    },
                    {
                        text: "Merge with blow",
                        action: "mergeBelow",
                    },
                ],
                separator: true,
            }
        ])
        return items;
    }

    insertColumnBefore() {
        this.insertColumn(0)
    }
    insertColumnAfter() {
        this.insertColumn(1);
    }

    private insertColumn(index: number) {
        const table = this.parent.parent;
        table.widgets.forEach(row => {
            const col = this.widgetService.resolve("table-cell");
            row.options.widgets.splice(this.findIndex() + index, 0, col);
            row.$owner.refresh();
        });
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

