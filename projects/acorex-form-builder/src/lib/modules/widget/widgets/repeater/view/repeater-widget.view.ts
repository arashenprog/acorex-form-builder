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
    constructor(
        protected cdr: ChangeDetectorRef) {
        super(cdr);
    }

    onRender() {
        this.cdr.markForCheck();
    }

    getBody() {
        if (!this.value) {
            return [];
        }
        const row = this.widgets.find(c => c.options.isHeader === false);
        const items = Array.apply(null, new Array(this.value.length)).map(function () { return row; });
        return items;
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.refresh();
    }

    // refresh() {
    //     if (this.dataSource.mode === 'remote') {
    //         // this.dataService.getList(
    //         //     this.dataSource.dataSource.name,
    //         //     this.dataSource.dataSource.params
    //         // ).then(c => {
    //         //     this.dataSource.dataItems = c;
    //         //     super.refresh();
    //         // });
    //     } else {
    //         super.refresh();
    //     }
    // }

    addItemClick() {
        if (!this.value) {
            this.value = [];
        }
        this.value.push({});
        this.cdr.markForCheck();
    }


}
