import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetView, AXFValueWidgetView } from '../../../config/widget';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({
    templateUrl: './list-input-widget.view.html',
    styleUrls: ['./list-input-widget.view.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFListInputWidgetView extends AXFValueWidgetView {

    dataSource: AXFDataSourceOption;
    mode: string;
    direction: string;
    alignCheck: string;
    alignCheckNew:string;
    viewType: string;
    columns: number;
    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
    }

    onRender(): void {
        this.cdr.markForCheck();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.refresh();
    }

    refresh() {
        if (this.dataSource.mode === 'remote') {
            this.dataService.getList(
                this.dataSource.dataSource.name,
                this.dataSource.dataSource.params
            ).then(c => {
                this.dataSource.dataItems = c;
                super.refresh();
            });
        } else {
            super.refresh();
        }
    }

    getStyles(mode) {
        const styles = {
            'border-radius': mode === 'single' ? 100 + '%' : 0
        };
        return styles;
    }

    onCheckValueChange(val) {
        if (this.readonly) {
            return;
        }

        if (this.mode === 'single') {
            this.value = [val];
        } else {
            if (!this.value) {
                this.value = [];
            }

            if (!this.value.includes(val)) {
                this.value = [...this.value, ...[val]];
            } else {
                this.value = this.value.filter(c => c !== val);
            }
        }
    }
}
 