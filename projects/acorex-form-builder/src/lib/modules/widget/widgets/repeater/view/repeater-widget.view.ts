import { Component, OnInit, ElementRef, HostBinding, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AXFWidgetView, AXFValueWidgetView } from '../../../config/widget';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';
import { WidgetConfig } from '../../../services/widget.service';
import { AXFRepeaterlWidgetFormula } from '../formula';

@Component({
    selector: "[axf-repeater]",
    templateUrl: './repeater-widget.view.html',
    styleUrls: ['./repeater-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFRepeaterWidgetView extends AXFValueWidgetView {

    dataSource: AXFDataSourceOption;
    showHeader: boolean;
    headerRows: WidgetConfig[];
    bodyRows: WidgetConfig[];
    rowTemplate: WidgetConfig;
    allowAdd: boolean;

    get formula() {
        return new AXFRepeaterlWidgetFormula(this);
    }

    constructor(
        protected cdr: ChangeDetectorRef) {
        super(cdr);
        this.valueChange.subscribe(() => {
            this.cdr.markForCheck();
            this.cdr.detectChanges();
        });
    }

    onRender() {
        if (this.showHeader) {
            this.headerRows = this.widgets.filter(c => c.options.isHeader === true);
        }
        if (!this.readonly || this.bodyRows === undefined) {
            this.rowTemplate = this.widgets.find(c => c.options.isHeader === false);
            this.bodyRows = this.allItems().map(c => {
                const cloned = this.widgetService.clone(this.rowTemplate);
                cloned.dataContext = c;
                return cloned;
            });
        }
        setTimeout(() => {
            if (this.bodyRows.length === 0 && !this.readonly) {
                this.addItemClick();
            } else {
                this.cdr.detectChanges();
            }
        }, 100);
    }

    addItemClick() {
        if (this.rowTemplate) {
            this.bodyRows.push(this.widgetService.clone(this.rowTemplate));
        }
        this.cdr.detectChanges();
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
        if(!this.value && this.dataService['dataModel'][this.getPath()])
           this.value=this.dataService['dataModel'][this.getPath()];
       
        if (Array.isArray(this.value)) {
            result.push(...this.value);
        } 
        let fixedCols = this.dataSource.columns.filter(d => d.fillByUser == false).map(d => d.fieldName);
        if (Array.isArray(this.dataSource.dataItems)) {
            for (let i = 0; i < this.dataSource.dataItems.length; i++) {
                const item = this.dataSource.dataItems[i];
                if (result[i]) {
                    Object.assign(result[i], fixedCols.reduce(function (o, k) { o[k] = item[k]; return o; }, {}));
                } else {
                    result[i] = item;
                }
            }
        }
        return result;
    }

    trackbyFunc(index: number, item: WidgetConfig) {
        return index;
    }


    remove(index: number) {
        this.bodyRows.splice(index, 1);
    }
}
