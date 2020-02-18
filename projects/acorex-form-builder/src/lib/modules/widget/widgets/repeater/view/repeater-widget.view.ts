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
        this.valueChange.subscribe(() => {
            this.cdr.markForCheck();
            this.cdr.detectChanges();
        });
    }

    onRender() {
        this.cdr.markForCheck();
    }

    getHeader() {
        if (!this.value) {
            return [];
        }
        const row = this.widgets.find(c => c.options.isHeader === true);
        const items = Array.apply(null, new Array(this.value.length)).map(function () { return row; });
        return items;
    }

    getBody() {
        if (!this.value) {
            return [];
        }
        const row = this.widgets.find(c => c.options.isHeader === false);
        const items = Array.apply(null, new Array(this.value.length)).map(function () { return row; });
        return items;
    }

    addItemClick() {
        if (!this.value) {
            this.value = [];
        }
        this.value.push({});
        this.cdr.markForCheck();
    }


}
