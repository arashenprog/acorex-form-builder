import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { AXFBoxStyleValue } from '../../../../property-editor/editors/style/box-style/box-style.class';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';
import { WidgetConfig } from '../../../services/widget.service';
import { AXFDataService } from '../../../services/data.service';

@Component({
   // selector: "td",
    templateUrl: './repeater-widget.print.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFRepeaterWidgetPrint extends AXFWidgetPrint {
    dataSource: AXFDataSourceOption;
    showHeader: boolean;
    headerRow: WidgetConfig;
    bodyRows: WidgetConfig[];
    rowTemplate: WidgetConfig;


    constructor(protected cdr: ChangeDetectorRef,private dataService:AXFDataService,
        private hostElement: ElementRef<HTMLTableCellElement>) {
        super()
    }

    onRender() {
        if (this.showHeader) {
            this.headerRow = this.widgets.find(c => c.options.isHeader === true);
        }
        this.rowTemplate = this.widgets.find(c => c.options.isHeader === false);
        this.bodyRows = this.allItems().map(c => {
            const cloned = this.widgetService.clone(this.rowTemplate);
            cloned.dataContext = c;
            return cloned;
        });
        this.cdr.markForCheck();
    }

    ngOnInit() {
        if (this.dataSource.mode === 'remote') {
            this.dataSource.dataSource.params.forEach(p => {
                if (typeof (p.value) === 'string' && p.value.startsWith('$')) {
                    p.value = this.resolveProperty(p.value);
                }
            });
            this.dataService.getList(this.dataSource.dataSource.name, this.dataSource.dataSource.params).then(items => {
                if (items && items.length) {
                    this.dataSource.dataItems = items;
                    this.refresh();
                }
            });
        } else {
            this.refresh();
        }
    }

    private allItems(): any[] {
        const result = [];
        if (Array.isArray(this.value)) {
            result.push(...this.value);
        }
        if (Array.isArray(this.dataSource.dataItems)) {
            for (let i = 0; i < this.dataSource.dataItems.length; i++) {
                const item = this.dataSource.dataItems[i];
                if (result[i]) {
                    Object.assign(result[i], item);
                } else {
                    result[i] = item;
                }
            }
            return result;
        }
    }

    trackbyFunc(index: number, item: WidgetConfig) {
        return index;
    }

}
