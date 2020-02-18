import { Component, OnInit, ElementRef, HostBinding, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AXFWidgetView, AXFValueWidgetView } from '../../../config/widget';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({
    selector: "[axf-repeater]",
    templateUrl: './repeater-widget.view.html',
    styleUrls: ['./repeater-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFRepeaterWidgetView extends AXFValueWidgetView {

    dataSource: AXFDataSourceOption;
    showHeader: boolean;

    constructor(
        protected cdr: ChangeDetectorRef) {
        super(cdr);
        this.valueChange.subscribe(() => {
            this.cdr.markForCheck();
            this.cdr.detectChanges();
        });
    }

    onRender() {
        this.cdr.markForCheck();
    }

    getHeader() {

        if (!this.showHeader) {
            return [];
        }
        const row = this.widgets.find(c => c.options.isHeader === true);
        const items = Array.apply(null, new Array(1)).map(c => row);
        return items;
    }

    getBody() {

        const row = this.widgets.find(c => c.options.isHeader === false);
        const items = Array.apply(null, new Array(this.allItems().length)).map(c => row);
        return items;
    }

    addItemClick() {
        if (!this.value) {
            this.value = [];
        }
        this.value.push({});
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
                    this.cdr.markForCheck();
                }
            });
        } else {
            this.cdr.markForCheck();
        }
    }

    private allItems(): any[] {
        const result = [];
        if (Array.isArray(this.value)) {
            result.push(...this.value);
        }
        if (Array.isArray(this.dataSource.dataItems)) {
            result.push(...this.dataSource.dataItems);
        }
        return result;
    }


}
